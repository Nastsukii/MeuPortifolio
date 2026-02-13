export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Registra uma visualização de página no Google Analytics
 * @param url - URL da página visualizada
 * https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 */
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
}

/**
 * Registra um evento genérico no Google Analytics
 * @param {GTagEvent} params - Parâmetros do evento
 * https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
