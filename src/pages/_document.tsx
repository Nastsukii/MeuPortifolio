import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/**
 * Componente Document Customizado
 * Responsável pela estrutura HTML inicial do documento, carregamento de fontes e metatags globais.
 * Renderizado apenas no servidor (SSR).
 */
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Configuração de codificação de caracteres */}
          <meta charSet="utf-8" />
          {/* Favicon */}
          <link rel="icon" href="/favicon.svg" />
          
          {/* Metatags Open Graph (OG) padrão para compartilhamento em redes sociais */}
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Luiz Antonio Comiran Bueno" />
          
          {/* Configuração de card para Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          
          {/* Preconnect para melhorar performance de carregamento de fontes do Google */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </Head>
        <body className="bg-white dark:bg-gray-900">
          {/* 
            Formulário oculto para integração com Netlify Forms.
            Permite que o Netlify detecte e processe submissões de formulário sem backend.
          */}
          <form name="contato" method="POST" data-netlify="true" hidden>
            <input type="hidden" name="form-name" value="contato" />
            <input type="text" name="name" />
            <input type="email" name="email" />
            <textarea name="message"></textarea>
          </form>
          
          {/* Renderiza a aplicação principal */}
          <Main />
          {/* Scripts necessários do Next.js */}
          <NextScript />
        </body>
      </Html>
    );
  }
}
