import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import featuredProjectsData from '../../../content/data/featuredProjects.json';

export const FeaturedProjects = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {featuredProjectsData.titleEmoji} {t('home.projects.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('home.projects.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredProjectsData.projects.map((project) => (
            <Link
              key={project.id}
              href={project.link}
              onClick={() => trackEvent('click', 'Project Card', `Project ${project.id} - Home`)}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-video bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center relative overflow-hidden">
                {project.screenshotUrl ? (
                  <img src={project.screenshotUrl} alt={project.title ?? t(project.titleKey)} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-6xl font-bold opacity-20">
                    {project.id}
                  </span>
                )}
                {project.featured && (
                  <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ {t('projects.featuredBadge')}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {(project.title ?? t(project.titleKey))} {project.id}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t(project.descriptionKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/projetos"
            onClick={() => trackEvent('click', 'CTA', 'View All Projects - Home')}
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 neon-shadow"
          >
            {t('home.projects.viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  );
};

