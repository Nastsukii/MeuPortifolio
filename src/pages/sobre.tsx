import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';
import { PageSection } from '@/components/commons/PageSection';

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

      <div className="min-h-screen">
        <PageSection
          title={t('about.title')}
          subtitle=""
          vPadding="py-20"
        >
          <div className="col-span-full">
            <div className="prose prose-lg max-w-none mx-auto">
              {/* Education and Specialization blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('about.education.title')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {t('about.education.degree')}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('about.specialization.title')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {t('about.specialization.area')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-shrink-0 flex flex-row sm:flex-col gap-4 sm:gap-8 justify-center lg:justify-start">
                  <Image
                    src="/img/perfil2.jpeg"
                    alt="Luiz Antonio Comiran Bueno"
                    width={256}
                    height={256}
                    className="w-24 h-24 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full object-cover shadow-2xl"
                  />
                  <Image
                    src="/img/perfil3.jpeg"
                    alt="Luiz Antonio Comiran Bueno working"
                    width={256}
                    height={256}
                    className="w-24 h-24 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full object-cover shadow-2xl"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {t('about.introduction')}
                  </p>
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Formação Acadêmica
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Formação Técnica
                        </h4>
                        <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                          <li><strong>Curso:</strong> Técnico em Desenvolvimento de Sistemas</li>
                          <li><strong>Instituição:</strong> CEEP (Centro Estadual de Educação Profissional)</li>
                          <li><strong>Localização:</strong> Cascavel</li>
                          <li><strong>Situação:</strong> Concluído</li>
                        </ul>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Graduação em Andamento
                        </h4>
                        <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                          <li><strong>Curso:</strong> Tecnologia em Análise e Desenvolvimento de Sistemas</li>
                          <li><strong>Instituição:</strong> UNIVEL (Centro Universitário de Cascavel)</li>
                          <li><strong>Modalidade:</strong> Presencial</li>
                          <li><strong>Localização:</strong> Cascavel</li>
                          <li><strong>Período Atual:</strong> 2º período</li>
                          <li><strong>Situação:</strong> Cursando</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('about.services.title')}
                    </h3>
                    <ul className="text-lg text-gray-700 dark:text-gray-300 space-y-2 mb-6 list-disc list-inside">
                      {t('about.services.items').map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('about.whyChoose.title')}
                    </h3>
                    <ul className="text-lg text-gray-700 dark:text-gray-300 space-y-2 mb-6 list-disc list-inside">
                      {t('about.whyChoose.items').map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('about.skills.title')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg text-gray-700 dark:text-gray-300">
                      <div>
                        <h4 className="font-semibold mb-2">{t('about.skills.frontend')}</h4>
                        <p>{t('about.skills.frontendTechs')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t('about.skills.backend')}</h4>
                        <p>{t('about.skills.backendTechs')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t('about.skills.deploy')}</h4>
                        <p>{t('about.skills.deployTechs')}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </PageSection>


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
