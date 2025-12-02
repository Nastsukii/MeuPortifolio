import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';
import aboutData from '../../../content/data/about.json';

export const AboutSection = () => {
  const { t } = useLanguage();
  const { photo, link } = aboutData.about;

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <Image
              src={photo.url}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.about.title')}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {t('home.about.description')}
            </p>
            <Link
              href={link}
              onClick={() => trackEvent('click', 'CTA', 'About - Home')}
              className="inline-flex items-center gap-2 text-primary hover:gap-3 font-semibold text-lg transition-all duration-200"
            >
              {t('home.about.cta')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

