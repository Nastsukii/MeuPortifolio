import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';
import { projectsData, ProjectData } from '@/lib/projectsData';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaCalendarAlt, FaCode } from 'react-icons/fa';

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  color: var(--foreground);
  padding-bottom: 4rem;
`;

const Header = styled.header`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .dark & {
    background: rgba(17, 24, 39, 0.8);
    border-color: #374151;
  }
`;

const BackButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  color: var(--foreground);
  text-decoration: none;
  transition: background 0.2s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  .dark &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const HeroSection = styled.section`
  max-w: 1000px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
`;

const ProjectHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: #6b7280;
  font-size: 1.1rem;

  .dark & {
    color: #9ca3af;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  margin-bottom: 3rem;
  border: 1px solid rgba(0,0,0,0.1);

  .dark & {
    border-color: rgba(255,255,255,0.1);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const TextBlock = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #4b5563;
  margin-bottom: 2rem;
  white-space: pre-line;

  .dark & {
    color: #d1d5db;
  }
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TechTag = styled.span`
  background: rgba(0, 112, 243, 0.1);
  color: #0070f3;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.9rem;

  .dark & {
    background: rgba(0, 112, 243, 0.2);
    color: #3291ff;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #4b5563;

  .dark & {
    color: #d1d5db;
  }

  &::before {
    content: "✓";
    color: var(--primary);
    font-weight: bold;
  }
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &.primary {
    background: var(--primary);
    color: white;
    box-shadow: 0 10px 15px -3px rgba(0, 112, 243, 0.3);
  }

  &.secondary {
    background: white;
    border: 2px solid var(--border);
    color: var(--foreground);

    .dark & {
      background: #1f2937;
      border-color: #374151;
    }
  }
`;

// ============================================================================
// TYPES & LOGIC
// ============================================================================

interface ProjectProps {
  project: ProjectData;
  businessSettings: any;
}

const ProjectPage = ({ project, businessSettings }: ProjectProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  const getScreenshotUrl = (url: string) => {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200`;
  };

  return (
    <>
      <Head>
        <title>{`${project.title} - Detalhes | ${businessSettings.brandName}`}</title>
      </Head>

      <PageContainer>
        <Header>
          <Link href="/projetos" passHref legacyBehavior>
            <BackButton>
              <FaArrowLeft /> Voltar para Projetos
            </BackButton>
          </Link>
        </Header>

        <HeroSection>
          <ProjectHeader>
            <Title>{project.title}</Title>
            <MetaInfo>
              <InfoItem>
                <FaCalendarAlt /> {project.year}
              </InfoItem>
              <InfoItem>
                <FaCode /> {project.role}
              </InfoItem>
            </MetaInfo>
          </ProjectHeader>

          <MainImageContainer>
            <Image
              src={getScreenshotUrl(project.link)}
              alt={`Screenshot de ${project.title}`}
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              className="bg-gray-100 dark:bg-gray-800"
              priority
            />
          </MainImageContainer>

          <ContentGrid>
            <MainContent>
              <SectionTitle>Sobre o Projeto</SectionTitle>
              <TextBlock>{project.fullDescription}</TextBlock>

              <SectionTitle>A História</SectionTitle>
              <TextBlock>{project.story}</TextBlock>

              <SectionTitle>Funcionalidades</SectionTitle>
              <FeatureList>
                {project.funcionalidades.map((func, i) => (
                  <FeatureItem key={i}>{func}</FeatureItem>
                ))}
              </FeatureList>
            </MainContent>

            <Sidebar>
              <div>
                <SectionTitle>Tecnologias</SectionTitle>
                <TechTags>
                  {project.tecnologias.map((tech, i) => (
                    <TechTag key={i}>{tech}</TechTag>
                  ))}
                </TechTags>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ActionButton href={project.link} target="_blank" className="primary">
                  <FaExternalLinkAlt /> Visitar Site
                </ActionButton>
                {/* 
                  Se houvesse repo link:
                  <ActionButton href={project.repo} target="_blank" className="secondary">
                    <FaGithub /> Ver Código
                  </ActionButton> 
                */}
              </div>
            </Sidebar>
          </ContentGrid>
        </HeroSection>
      </PageContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projectsData.map((project) => ({
    params: { slug: project.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = projectsData.find((p) => p.slug === params?.slug);
  const businessSettings = getBusinessSettings();

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
      businessSettings,
    },
  };
};

export default ProjectPage;
