import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Metatags essenciais */}
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.svg" />
        
        {/* Metatags Open Graph padrão */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Luiz Antonio Comiran Bueno" />
        
        {/* Metatags Twitter padrão */}
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-white dark:bg-gray-900">

        
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
