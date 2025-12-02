import { useLanguage } from '@/contexts/LanguageContext';
import statsData from '../../../content/data/stats.json';

export const StatsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          {t('home.stats.title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.stats.map((stat) => (
            <div key={stat.id} className="text-center">
              {stat.icon && <div className="text-4xl mb-2">{stat.icon}</div>}
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">
                {t(stat.translationKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

