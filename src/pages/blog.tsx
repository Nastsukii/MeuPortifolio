import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';
import { PageSection } from '@/components/commons/PageSection';
import { useUser, SignInButton } from "@clerk/nextjs";

/**
 * Interface para propriedades estáticas da página Blog
 */
interface BlogProps {
  businessSettings: any;
  generalSettings: any;
}

/**
 * Componente da Página Blog
 * Esta página possui conteúdo exclusivo protegido. Apenas usuários logados podem ver a Timeline completa.
 */
const Blog = ({ businessSettings, generalSettings }: BlogProps) => {
  const { t } = useLanguage();
  const { isSignedIn, isLoaded } = useUser();

  // === ESTADO 1: Carregando Autenticação ===
  // Mostra um spinner enquanto o Clerk verifica se o usuário está logado
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">{t('blog.exclusive.loading')}</p>
        </div>
      </div>
    );
  }

  // === ESTADO 2: Usuário Não Autenticado ===
  // Mostra mensagem de "Conteúdo Exclusivo" e botão de login se não estiver logado
  if (!isSignedIn) {
    return (
      <>
        <Head>
          <title>{`Blog | ${businessSettings.brandName}`}</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            {/* Ícone de bloqueio/segurança */}
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('blog.exclusive.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t('blog.exclusive.message')}
            </p>
            
            {/* Botão de Login do Clerk configurado para abrir em modal */}
            <SignInButton mode="modal">
              <button className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl neon-shadow">
                {t('blog.exclusive.loginButton')}
              </button>
            </SignInButton>
          </div>
        </div>
      </>
    );
  }

  // === ESTADO 3: Usuário Autenticado ===
  // Renderiza o conteúdo completo do Blog (Timeline)
  return (
    <>
      <Head>
        <title>{`Blog | ${businessSettings.brandName}`}</title>
        <meta
          name="description"
          content={`Timeline da carreira de ${businessSettings.brandName} - Desenvolvedor web`}
        />
        <meta property="og:title" content={`Blog | ${businessSettings.brandName}`} />
        <meta property="og:description" content={`Timeline da carreira de ${businessSettings.brandName} - Desenvolvedor web`} />
      </Head>

      <div className="min-h-screen">
        <PageSection
          title={t('blog.title')}
          subtitle={t('blog.subtitle')}
          vPadding="py-20"
        >
          <div className="col-span-full">
            <div className="max-w-4xl mx-auto">
              {/* Container da Timeline Visual */}
              <div className="relative">
                {/* Linha vertical contínua conectando os pontos */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 dark:bg-primary/20"></div>
                
                {/* Lista de itens da timeline vindos da tradução (JSON) */}
                <div className="space-y-12">
                  {Array.isArray(t('blog.timeline')) && t('blog.timeline').map((item: any, index: number) => (
                    <div key={index} className="relative flex items-start">
                      {/* Ponto (Dot) da timeline - Marcador visual */}
                      <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-gray-900 z-10 neon-shadow"></div>
                      
                      {/* Cartão de Conteúdo */}
                      <div className="ml-16 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                        
                        {/* Data */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">
                            {item.date}
                          </span>
                        </div>
                        
                        {/* Título do evento */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {item.title}
                        </h3>
                        
                        {/* Descrição detalhada */}
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seção de Chamada para Ação (CTA) inferior */}
              <div className="text-center mt-16">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('blog.cta.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  {t('blog.cta.description')}
                </p>
                <Link
                  href="/contato"
                  className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 neon-shadow"
                >
                  {t('blog.cta.button')}
                </Link>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </>
  );
};

// Carregamento de configurações globais no servidor
export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const businessSettings = getBusinessSettings();
  const generalSettings = getGeneralSettings();

  return {
    props: {
      businessSettings,
      generalSettings,
    },
  };
};

export default Blog;
