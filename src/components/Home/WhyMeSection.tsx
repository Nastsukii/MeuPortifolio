import { useLanguage } from '@/contexts/LanguageContext';
import whyMeData from '../../../content/data/whyMe.json';

/**
 * Seção "Por que me escolher?"
 * Destaca diferenciais competitivos.
 */
export const WhyMeSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
          {t('home.whyMe.title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          {t('home.whyMe.subtitle')}
        </p>

        <div className="space-y-6">
          {whyMeData.reasons.map((reason) => (
            <div
              key={reason.id}
              className="flex gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-200"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t(reason.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t(reason.descriptionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
