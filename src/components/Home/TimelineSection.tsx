import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
// Importa dados da linha do tempo
import timelineData from '../../../content/data/timeline.json';

/**
 * Seção de Linha do Tempo (Minha Jornada)
 * Exibe a trajetória profissional/acadêmica em um layout horizontal responsivo.
 */
export const TimelineSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {timelineData.titleEmoji} {t('home.timeline.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('home.timeline.subtitle')}
          </p>
        </div>

        {/* Container da Timeline Horizontal */}
        {/* flex-col no mobile, flex-row no desktop com scroll horizontal se necessário ou wrap */}
        <div className="relative mb-12">
          {/* Linha conectora central (visível apenas desktop) */}
          <div className="hidden lg:block absolute top-[2.25rem] left-0 right-0 h-1 bg-gray-300 dark:bg-gray-700 z-0"></div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 overflow-x-auto pb-8 justify-start lg:justify-center">
            {/* Ordenação: Data (decrescente) */}
            {([...timelineData.timeline]
              .sort((a, b) => {
                const aDate = a.dateStart ? new Date(`${a.dateStart}-01`) : null;
                const bDate = b.dateStart ? new Date(`${b.dateStart}-01`) : null;
                if (aDate && bDate) return bDate.getTime() - aDate.getTime(); // Decrescente
                if (aDate) return 1;
                if (bDate) return -1;
                return (a.sortIndex ?? 0) - (b.sortIndex ?? 0);
              })
            )
              .map((item, index) => (
              <div
                key={item.id}
                className="relative z-10 flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:gap-3 lg:w-64 flex-shrink-0"
              >
                {/* Data e Marcador */}
                <div className="flex flex-col items-center">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full whitespace-nowrap mb-2 lg:mb-3">
                    {t(item.dateKey)}
                  </span>
                  
                  {/* Ponto na timeline */}
                  <div className="w-5 h-5 bg-primary rounded-full border-4 border-white dark:border-gray-900 neon-shadow z-20"></div>
                </div>

                {/* Conteúdo do Item */}
                <div className="flex-1 lg:text-center pt-1 lg:pt-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                    {t(item.titleKey)}
                  </h3>
                  {/* Poderia adicionar descrição aqui se houver no JSON */}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 font-semibold text-lg transition-all duration-200"
          >
            {t('home.timeline.viewAll')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
