import { useLanguage } from '@/contexts/LanguageContext';
import technologiesData from '../../../content/data/technologies.json';

/**
 * Seção de Stack Tecnológico
 * Exibe as tecnologias que domino (React, Node, etc.).
 */
export const TechStack = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-900/5"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {technologiesData.titleEmoji} {t('home.techStack.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('home.techStack.subtitle')}
          </p>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {technologiesData.technologies.map((tech) => (
            <div
              key={tech.id}
              className={`px-3 py-4 rounded-lg text-center font-bold text-base border-2 border-gray-300 dark:border-gray-600 ${tech.color} hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 shadow-md cursor-default`}
            >
              {t(tech.nameKey)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
