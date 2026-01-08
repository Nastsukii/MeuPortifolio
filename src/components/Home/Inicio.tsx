import { OptimizedImage } from '@/components/commons/OptimizedImage';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';
import heroData from '../../../content/data/hero.json';

export const Inicio = () => {
  const { t } = useLanguage();
  const { badge, photo } = heroData.hero;

  return (
    <section className="flex py-12 overflow-hidden lg:items-center lg:min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-6 lg:gap-20 py-8 lg:py-0">
          {/* Photo - First on mobile and desktop */}
          <div className="w-full flex justify-center mb-6 lg:w-auto lg:order-2 lg:mb-0">
            <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[400px] lg:h-[400px]">
              <div className="w-full h-full relative">
                <OptimizedImage
                  src={photo.url}
                  alt={photo.alt}
                  width={180}
                  height={180}
                  className="wavy-border shadow-2xl ring-4 sm:ring-8 ring-primary/20 dark:ring-primary/30 object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Content - Second on mobile */}
          <div className="flex-1 text-center lg:text-left lg:order-1">
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              <span className="particle-text block text-gray-600 dark:text-gray-300 text-xl sm:text-3xl font-medium mb-1 sm:mb-2">
                {t('home.title')}
              </span>
              <strong className="particle-text-delay-1 block text-primary">
                {t('home.titleBold')}
              </strong>
            </h1>

            <p className="particle-text-delay-2 text-base sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{ lineHeight: '2' }}>
              {t('home.subtitle')}
            </p>

            <div className="particle-text-delay-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/contato"
                onClick={() => trackEvent('click', 'CTA', 'Lets Talk - Hero')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
              >
                {t('cta.letsTalk')} →
              </Link>
              <Link
                href="/projetos"
                onClick={() => trackEvent('click', 'CTA', 'View Projects - Hero')}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
              >
                {t('cta.viewProjects')}
              </Link>
            </div>

            <div className="particle-fade-delay-2 inline-flex items-center gap-3 px-6 py-3 bg-primary/10 dark:bg-primary/20 rounded-full">
              {badge.icon && <span className="text-3xl">{badge.icon}</span>}
              <div className="text-left">
                <p className="text-sm font-semibold text-primary">
                  {t(badge.textKey)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
