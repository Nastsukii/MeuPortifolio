import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';
import { PageSection } from '@/components/commons/PageSection';
import { GreenBeamCard } from '@/components/commons/GreenBeamCard';
import { TechStack } from '@/components/Home/TechStack';

interface SobreProps {
  businessSettings: any;
  generalSettings: any;
}

const Sobre = ({ businessSettings, generalSettings }: SobreProps) => {
  const { t } = useLanguage();
  
  return (
    <>
      <Head>
        <title>{`About | ${businessSettings.brandName}`}</title>
        <meta
          name="description"
          content={`Learn more about ${businessSettings.brandName} - ${businessSettings.brandDescription}`}
        />
        <meta property="og:title" content={`About | ${businessSettings.brandName}`} />
        <meta property="og:description" content={`Learn more about ${businessSettings.brandName} - ${businessSettings.brandDescription}`} />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <PageSection
          title={t('about.title')}
          subtitle=""
          vPadding="py-20"
        >
          <div className="col-span-full">
            <div className="prose prose-lg max-w-none mx-auto">
              {/* === Blocos de Destaque: Educação e Especialização === */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {/* Bloco de Educação */}
                <GreenBeamCard className="h-full">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('about.education.title')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {t('about.education.degree')}
                  </p>
                </GreenBeamCard>

                {/* Bloco de Especialização */}
                <GreenBeamCard className="h-full">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('about.specialization.title')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {t('about.specialization.area')}
                  </p>
                </GreenBeamCard>
              </div>

              {/* === Conteúdo Principal: Foto e Introdução === */}
              <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
                
                {/* Fotos de Perfil */}
                <div className="flex-shrink-0 flex flex-row sm:flex-col gap-4 sm:gap-8 justify-center lg:justify-start">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <Image
                      src="/img/perfil2.jpeg"
                      alt="Luiz Antonio Comiran Bueno"
                      width={256}
                      height={256}
                      className="relative w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800"
                    />
                  </div>
                  <div className="relative group hidden sm:block">
                     <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-primary rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <Image
                      src="/img/perfil3.jpeg"
                      alt="Luiz Antonio Comiran Bueno working"
                      width={256}
                      height={256}
                      className="relative w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800"
                    />
                  </div>
                </div>

                {/* Texto e Seções Detalhadas */}
                <div className="flex-1">
                  {/* Introdução Textual */}
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-12">
                     <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        {t('about.introduction')}
                     </p>
                  </div>
                  
                  {/* === Formação Acadêmica Detalhada === */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-primary rounded-full"></span>
                      Formação Acadêmica
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* TADS (Univel) */}
                      <GreenBeamCard>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          TADS - Superior
                        </h4>
<<<<<<< HEAD
                        <p className="primary font-medium mb-4">Tecnologia em Análise e Desenvolvimento de Sistemas</p>
=======
                        <p className="text-primary font-medium mb-4">Tecnologia em Análise e Desenvolvimento de Sistemas</p>
>>>>>>> Refatoring
                        <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                            Unível - Cascavel PR
                          </li>
                          <li className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                             Cursando
                          </li>
                        </ul>
                      </GreenBeamCard>

                      {/* Técnico (CEEP) */}
                      <GreenBeamCard>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          Técnico
                        </h4>
                        <p className="text-primary font-medium mb-4">Desenvolvimento de Sistemas</p>
                        <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                            CEEP - Cascavel PR
                          </li>
                          <li className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                             Concluído
                          </li>
                        </ul>
                      </GreenBeamCard>

                      {/* DevClub */}
                      <GreenBeamCard>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          Full-Stack Starter
                        </h4>
                        <p className="text-primary font-medium mb-4">Formação Web Full-Stack</p>
                         <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                            DevClub
                          </li>
                          <li className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                             Concluído
                          </li>
                        </ul>
                      </GreenBeamCard>
                    </div>
                  </div>
                  
                  {/* === Serviços Oferecidos === */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-primary rounded-full"></span>
                      {t('about.services.title')}
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                      <ul className="grid grid-cols-1 gap-4">
                        {t('about.services.items').map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3 text-lg text-gray-700 dark:text-gray-300">
                             <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                             {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* === Por que me escolher === */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                       <span className="w-2 h-8 bg-primary rounded-full"></span>
                      {t('about.whyChoose.title')}
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                      <ul className="grid grid-cols-1 gap-4">
                        {t('about.whyChoose.items').map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3 text-lg text-gray-700 dark:text-gray-300">
                             <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Tecnologias Section - Full Width */}
        <div className="border-t border-gray-200 dark:border-gray-800">
             <TechStack />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<SobreProps> = async () => {
  const businessSettings = getBusinessSettings();
  const generalSettings = getGeneralSettings();

  return {
    props: {
      businessSettings,
      generalSettings,
    },
  };
};

export default Sobre;
