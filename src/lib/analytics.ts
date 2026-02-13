/**
 * Função para rastrear eventos personalizados do Google Analytics
 * @param action - Nome da ação (ex: 'click', 'submit')
 * @param category - Categoria do evento (ex: 'CTA', 'Form')
 * @param label - Rótulo detalhado para o evento (ex: 'Botão Contato Home')
 */
export const trackEvent = (action: string, category: string, label: string) => {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
