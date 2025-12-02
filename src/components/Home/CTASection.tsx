import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import ctaData from '../../../content/data/cta.json';

export const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {ctaData.cta.titleEmoji} {t('home.cta.title')}
        </h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          {t('home.cta.description')}
        </p>
        
        <Link
          href={ctaData.cta.link}
          onClick={() => trackEvent('click', 'CTA', 'Final CTA - Home')}
          className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-10 rounded-lg text-lg transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 neon-shadow"
        >
          {t('home.cta.button')} →
        </Link>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-700 dark:text-white">
          {ctaData.cta.contacts.map((contact) => {
            if (contact.type === 'email' && contact.translationKey) {
              return (
                <a
                  key={contact.type}
                  href={`mailto:${t(contact.translationKey)}`}
                  className="flex items-center gap-2 hover:text-primary/80 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="font-medium">{t(contact.translationKey)}</span>
                </a>
              );
            } else if (contact.url && contact.label) {
              return (
                <a
                  key={contact.type}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary/80 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="font-medium">{contact.label}</span>
                </a>
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
};

