import { OptimizedImage } from '@/components/commons/OptimizedImage';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';
// Importa dados do arquivo JSON local
import heroData from '../../../content/data/hero.json';
// Importa ícone de graduação da biblioteca react-icons
import { FaGraduationCap } from 'react-icons/fa';

/**
 * Seção Hero (Página Inicial)
 * Apresentação principal com foto, título, subtítulo e CTAs.
 */
export const Inicio = () => {
  const { t } = useLanguage();
  const { badge, photo } = heroData.hero;
  const GraduationIcon = FaGraduationCap as any;

  return (
    <section className="flex py-12 overflow-hidden lg:items-center lg:min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-6 lg:gap-20 py-8 lg:py-0">
          {/* Foto Principal */}
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

          {/* Conteúdo Textual */}
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

            {/* CTAs */}
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

            {/* Seção de Formação Acadêmica - Adicionada conforme solicitado */}
            <div className="particle-text-delay-4 mb-8 w-full">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <GraduationIcon className="text-primary text-2xl" />
                Formação Acadêmica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Item 1: Unível */}
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors shadow-sm">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm md:text-base">TADS - Superior</h4>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Tecnologia em Análise e Desenvolvimento de Sistemas
                  </p>
                  <span className="text-xs font-semibold text-primary mt-2 block">Unível - Cascavel PR</span>
                </div>

                {/* Item 2: CEEP */}
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors shadow-sm">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm md:text-base">Técnico</h4>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Desenvolvimento de Sistemas
                  </p>
                  <span className="text-xs font-semibold text-primary mt-2 block">CEEP - Cascavel PR</span>
                </div>

                {/* Item 3: DevClub */}
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors shadow-sm">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm md:text-base">Full-Stack Starter</h4>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Formação Web Full-Stack
                  </p>
                  <span className="text-xs font-semibold text-primary mt-2 block">DevClub</span>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

