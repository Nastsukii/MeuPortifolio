import React from 'react';
import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/gtag';

/**
 * Componente para integração do Google Analytics 4 (GA4).
 * Injeta os scripts necessários (gtag.js) apenas se o ID de rastreamento estiver definido.
 */
export const GoogleAnalytics = () => {
  // Se não houver ID de rastreamento, não renderiza nada para evitar erros
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      {/* Carrega a biblioteca gtag.js do Google */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      {/* Configura o Google Analytics */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
};
