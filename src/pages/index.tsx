import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useUser } from "@clerk/nextjs";

// Componentes da Página Inicial
import { Inicio } from '@/components/Home/Inicio';
import { AboutSection } from '@/components/Home/AboutSection';
import { ServicesSection } from '@/components/Home/ServicesSection';
import { FeaturedProjects } from '@/components/Home/FeaturedProjects';
import { TechStack } from '@/components/Home/TechStack';
import { TimelineSection } from '@/components/Home/TimelineSection';
import { CTASection } from '@/components/Home/CTASection';

// Tipos e Utilitários
import { AboutMe as TAboutMe } from '@/types/Home';
import { getSortedPostsData } from '@/lib/posts';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';

// Dados Estáticos
import homeData from '../../public/home.json';

/**
 * Interface para as propriedades recebidas pelo componente Home via getStaticProps
 */
interface HomeProps {
  home: {
    aboutMe: TAboutMe;
  };
  // Dados dos posts do blog para possível exibição
  allPostsData: Array<{
    slug: string;
    title: string;
    date: string;
    author: string;
    public: boolean;
  }>;
  // Configurações gerais do site
  businessSettings: any;
  generalSettings: any;
}

/**
 * Componente da Página Inicial (Home)
 * Apresenta a visão geral do portfólio, incluindo seções de sobre, projetos, serviços, etc.
 */
const Home = ({ home, allPostsData, businessSettings, generalSettings }: HomeProps) => {
  // Extrai dados de "Sobre Mim" com fallback para objeto vazio
  const { aboutMe } = home || { aboutMe: {} as TAboutMe };
  
  // Hook de tradução (não utilizado explicitamente no JSX aqui, mas disponível)
  const { t } = useLanguage();
  
  // Hook de autenticação do Clerk
  const { isSignedIn } = useUser(); 

  return (
    <>
      <Head>
        {/* Configurações de SEO e Metatags Específicas da Home */}
        <title>Luiz Antonio Comiran Bueno — Desenvolvedor Full Stack | Next.js, React, Node.js</title>
        <meta
          name="description"
          content="Desenvolvedor Full Stack especializado em Next.js, React e Node.js. Criação de aplicações web modernas, responsivas e escaláveis. Veja meu portfolio e entre em contato."
        />
        <meta name="keywords" content="desenvolvedor full stack, next.js, react, node.js, typescript, desenvolvimento web" />
        <link rel="canonical" href={generalSettings.siteUrl} />
        <meta name="robots" content="index, follow" />

        {/* Metatags Open Graph (Facebook/LinkedIn) */}
        <meta property="og:title" content="Luiz Antonio Comiran Bueno — Desenvolvedor Full Stack" />
        <meta property="og:description" content="Desenvolvimento de aplicações web modernas com Next.js, React e Node.js. Veja meu portfolio de projetos." />
        <meta property="og:url" content={generalSettings.siteUrl} />
        <meta property="og:image" content={`${generalSettings.siteUrl}/img/og-image.jpg`} />
        <meta property="og:image:alt" content="Portfolio Luiz Antonio Comiran Bueno - Desenvolvedor Full Stack" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Metatags Twitter */}
        <meta name="twitter:title" content="Luiz Antonio Comiran Bueno — Desenvolvedor Full Stack" />
        <meta name="twitter:description" content="Desenvolvimento de aplicações web modernas com Next.js, React e Node.js. Veja meu portfolio de projetos." />
        <meta name="twitter:image" content={`${generalSettings.siteUrl}/img/twitter-image.jpg`} />

        {/* JSON-LD para SEO (Schema.org) - Dados estruturados sobre a Pessoa e o WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "name": "Luiz Antonio Comiran Bueno",
                  "jobTitle": "Desenvolvedor Full Stack",
                  "url": generalSettings.siteUrl,
                  "image": `${generalSettings.siteUrl}/img/perfil.jpeg`,
                  "sameAs": [
                    "https://github.com/Nastsukii",
                    "https://www.linkedin.com/in/luiz-antonio-comiran-bueno/"
                  ],
                  "knowsAbout": [
                    "Next.js",
                    "React",
                    "Node.js",
                    "TypeScript",
                    "Desenvolvimento Web Full Stack"
                  ]
                },
                {
                  "@type": "WebSite",
                  "name": "Portfolio Luiz Antonio Comiran Bueno",
                  "url": generalSettings.siteUrl,
                  "description": "Professional portfolio of Luiz Antonio Comiran Bueno, Full Stack developer specialized in Next.js, React and Node.js",
                  "inLanguage": "en-US"
                }
              ]
            })
          }}
        />
      </Head>
      
      <div className="w-full">
        {/* Seção Principal (Hero) - Apresentação inicial */}
        <Inicio />

        {/* Seção de Serviços oferecidos */}
        <ServicesSection />

        {/* Seção Sobre Mim */}
        <AboutSection />

        {/* Projetos em Destaque */}
        <FeaturedProjects />

        {/* Tecnologias e Habilidades */}
        <TechStack />

        {/* Linha do Tempo / Experiência */}
        <TimelineSection />

        {/* Chamada para Ação (Contato) no final da página */}
        <CTASection />
      </div>
    </>
  );
};

/**
 * getStaticProps: Função do Next.js para carregar dados estáticos no momento do build.
 * Garante performance máxima servindo HTML estático.
 */
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // Carrega dados diretamente do JSON importado
  const home = homeData;
  
  // Busca dados dos posts do blog
  const allPostsData = getSortedPostsData();
  
  // Busca configurações globais do sistema
  const businessSettings = getBusinessSettings();
  const generalSettings = getGeneralSettings();

  return {
    props: { 
      home,
      allPostsData,
      businessSettings,
      generalSettings,
    },
  };
};

export default Home;
