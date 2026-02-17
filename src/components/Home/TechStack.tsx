import { useLanguage } from '@/contexts/LanguageContext';
import technologiesData from '../../../content/data/technologies.json';
// Importação dos ícones das tecnologias da biblioteca react-icons/si
import { 
  SiTypescript, SiReact, SiJavascript, SiHtml5, SiCss3, 
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, 
  SiC, SiOpenai, SiNetlify, SiVercel 
} from 'react-icons/si';

/**
 * Mapeamento de strings de ícones para componentes React
 * Adicione novos ícones aqui conforme necessário
 */
const iconMap: { [key: string]: any } = {
  SiTypescript, SiReact, SiJavascript, SiHtml5, SiCss3,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiMicrosoftsqlserver: SiPostgresql, SiC, SiOpenai, SiNetlify, SiVercel
};

/**
 * Seção de Stack Tecnológico
 * Exibe as tecnologias que domino (React, Node, etc.) separadas por categoria.
 */
export const TechStack = () => {
  const { t } = useLanguage();

  // Filtragem das tecnologias por categoria (Frontend vs Backend)
  const frontendTechs = technologiesData.technologies.filter(tech => tech.category === 'frontend');
  const backendTechs = technologiesData.technologies.filter(tech => tech.category === 'backend');

  /**
   * Função auxiliar para renderizar um card de tecnologia
   * @param tech Objeto da tecnologia
   */
  const renderTechCard = (tech: any) => {
    // Recupera o componente do ícone do mapa, ou null se não existir
    const IconComponent = tech.icon ? iconMap[tech.icon] : null;

    return (
      <div
        key={tech.id}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm md:text-base border-2 transition-all duration-300 shadow-md cursor-default hover:shadow-xl hover:-translate-y-1 hover:scale-105 ${tech.color}`}
      >
        {/* Renderiza o ícone se existir */}
        {IconComponent && <IconComponent className={`text-xl md:text-2xl ${tech.iconColor || ''}`} />}
        <span className="text-gray-800 dark:text-gray-100">{t(tech.nameKey)}</span>
      </div>
    );
  };

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

        {/* Layout em Grid Principal: Duas Colunas (Frontend e Backend) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Coluna Frontend */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 border-b-2 border-blue-500/30 pb-2 mx-auto px-6">
              Front-End
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
              {frontendTechs.map(renderTechCard)}
            </div>
          </div>

          {/* Coluna Backend */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 border-b-2 border-green-500/30 pb-2 mx-auto px-6">
              Back-End
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
              {backendTechs.map(renderTechCard)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
