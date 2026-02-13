import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Componente de Prova Social
 * Exibe estatísticas (Projetos, Experiência, Tecnologias) para aumentar a credibilidade.
 */
export const SocialProof = () => {
  const { t } = useLanguage();

  const stats = [
    {
      number: "10+",
      label: t('socialProof.stats.projects'),
      icon: "🚀"
    },
    {
      number: "2+",
      label: t('socialProof.stats.experience'),
      icon: "💻"
    },
    {
      number: "15+",
      label: t('socialProof.stats.technologies'),
      icon: "⚡"
    },
    {
      number: "<24h",
      label: t('socialProof.stats.response'),
      icon: "⚡"
    }
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('socialProof.title')}
          </h2>
        </div>
        
        {/* Grid de Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section (Placeholder) */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('socialProof.testimonials.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 italic">
            {t('socialProof.testimonials.placeholder')}
          </p>
        </div>
      </div>
    </section>
  );
};
