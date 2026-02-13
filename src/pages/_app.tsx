import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ClerkProvider } from '@clerk/nextjs';

// Componentes e Contextos Globais
import { Layout } from '@/components/commons/Layout';
import { ThemeProvider } from '@/components/commons/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { GoogleAnalytics } from '@/components/commons/GoogleAnalytics';

// Utilitários e Estilos
import * as gtag from '@/lib/gtag';
import '@/styles/globals.css';

/**
 * Componente Principal da Aplicação (App)
 * Responsável por envolver todas as páginas com os provedores de contexto (Tema, Idioma, Autenticação)
 * e gerenciar eventos globais como mudanças de rota para Analytics.
 */
function App({ Component, pageProps }: AppProps) {
  // Chave pública do Clerk para autenticação, vinda das variáveis de ambiente
  const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const router = useRouter();

  // Efeito para rastrear visualizações de página no Google Analytics quando a rota muda
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    
    // Inscreve no evento de mudança de rota
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Remove a inscrição ao desmontar o componente
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Se a chave do Clerk não estiver configurada, renderiza a aplicação sem o provedor de autenticação
  // Isso evita erros em desenvolvimento se as variáveis de ambiente não estiverem setadas
  if (!PUBLISHABLE_KEY) {
    return (
      <LanguageProvider>
        <ThemeProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </LanguageProvider>
    );
  }

  // Renderização padrão com todos os provedores, incluindo Clerk (Auth)
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        
        {/* Componente para carregar scripts do Google Analytics */}
        <GoogleAnalytics />
        
        {/* @ts-expect-error - Ignora erro de tipagem conhecido no ClerkProvider */}
        <ClerkProvider 
          publishableKey={PUBLISHABLE_KEY} 
          initialState={pageProps.initialState}
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: '#3b82f6', // Azul padrão
              colorBackground: '#ffffff',
              colorInputBackground: '#ffffff',
              colorInputText: '#000000',
            },
            elements: {
              modalContent: {
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                borderRadius: '0.75rem',
              },
              modalBackdrop: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }
            }
          }}
        >
          {/* Layout padrão aplicado a todas as páginas */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ClerkProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
