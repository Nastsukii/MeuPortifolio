import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import servicesData from '../../../content/data/services.json';

export const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.services.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('home.services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {service.icon && <div className="text-5xl mb-4 text-primary">{service.icon}</div>}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t(service.titleKey)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t(service.descriptionKey)}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.techs.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary text-sm rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/sobre"
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl neon-shadow"
          >
            {t('home.services.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};

