import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';
import { projectsData } from '@/lib/projectsData';
import { FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const ProjectsContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 1.5rem;
  background-color: var(--background);
  color: var(--foreground);
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 0.5rem;
  color: inherit;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const PageSubtitle = styled.p`
  text-align: center;
  margin-bottom: 4rem;
  color: #6b7280;
  font-size: 1.125rem;
  max-w: 600px;
  margin-left: auto;
  margin-right: auto;
  
  .dark & {
    color: #9ca3af;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-w: 1400px;
  margin: 0 auto;
`;

const ProjectCard = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  z-index: 1;

  &:hover {
    z-index: 50;
  }
`;

const CardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: white;
  border: 1px solid rgba(0,0,0,0.05);

  .dark & {
    background: #1f2937;
    border-color: rgba(255,255,255,0.05);
  }

  ${ProjectCard}:hover & {
    height: auto;
    min-height: 100%;
    transform: scale(1.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: visible;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
  
  ${ProjectCard}:hover & {
     border-radius: 16px 16px 0 0;
  }
`;

const ClickToViewOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
  pointer-events: none;

  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

const ClickText = styled.span`
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  backdrop-filter: blur(4px);
`;

const StyledImage = styled(Image)`
  transition: transform 0.5s ease;
  
  ${ImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const DetailedOverlay = styled.div`
  padding: 1.5rem;
  background: white;
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .dark & {
    background: #1f2937;
  }

  ${ProjectCard}:hover & {
    opacity: 1;
    height: auto;
    overflow: visible;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--foreground);
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechBadge = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--primary);
  color: white;
  border-radius: 9999px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const ActionButton = styled.a`
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;

  &.primary {
    background: var(--primary);
    color: white;
    &:hover { filter: brightness(1.1); }
  }

  &.secondary {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--foreground);
    &:hover { background: rgba(0,0,0,0.05); }
    
    .dark & {
      border-color: #374151;
      &:hover { background: rgba(255,255,255,0.05); }
    }
  }
`;

const ProjectTitleBelow = styled.div`
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  background: white;
  border-top: 1px solid #eee;

  .dark & {
    background: #1f2937;
    border-top: 1px solid #374151;
    color: white;
  }
`;

// ============================================================================
// TYPES & DATA
// ============================================================================

interface ProjetosProps {
  businessSettings: any;
  generalSettings: any;
}

// ============================================================================
// COMPONENT
// ============================================================================

// Cast icons to avoid type errors with React 18
const InfoIcon = FaInfoCircle as React.ElementType;
const ExternalLinkIcon = FaExternalLinkAlt as React.ElementType;

const Projetos = ({ businessSettings }: ProjetosProps) => {
  const { t } = useLanguage();

  const getScreenshotUrl = (url: string) => {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800`;
  };

  return (
    <>
      <Head>
        <title>{`${t('projects.title')} | ${businessSettings.brandName}`}</title>
        <meta
          name="description"
          content={`Confira os projetos desenvolvidos por ${businessSettings.brandName}`}
        />
      </Head>

      <ProjectsContainer>
        <PageTitle>{t('projects.title')}</PageTitle>
        <PageSubtitle>{t('projects.subtitle')}</PageSubtitle>

        <ProjectsGrid>
          {projectsData.map((projeto) => (
            <div key={projeto.id}>
              <ProjectCard>
                <CardContent>
                  <a href={projeto.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', position: 'relative' }}>
                    <ImageContainer>
                      <ClickToViewOverlay>
                        <ClickText>Clique para ver</ClickText>
                      </ClickToViewOverlay>
                      <StyledImage
                        src={getScreenshotUrl(projeto.link)}
                        alt={`Screenshot do projeto ${projeto.title}`}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="bg-gray-100 dark:bg-gray-800"
                      />
                    </ImageContainer>
                  </a>
                  
                  <DetailedOverlay>
                    <ProjectTitle>{projeto.title}</ProjectTitle>
                    
                    <TechList>
                      {projeto.tecnologias.map((tech, i) => (
                        <TechBadge key={i}>{tech}</TechBadge>
                      ))}
                    </TechList>
                    
                     <div className="text-sm text-gray-600 dark:text-gray-300">
                      {projeto.funcionalidades.map((func, i) => (
                        <p key={i} className="mb-1">• {func}</p>
                      ))}
                    </div>

                    <ButtonGroup>
                      <Link href={`/projeto/${projeto.slug}`} passHref legacyBehavior>
                         <ActionButton className="primary">
                          <InfoIcon /> Mais Informações
                        </ActionButton>
                      </Link>
                      
                      <ActionButton 
                        href={projeto.link}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="secondary"
                      >
                         <ExternalLinkIcon /> Visitar
                      </ActionButton>
                    </ButtonGroup>
                  </DetailedOverlay>
                </CardContent>
              </ProjectCard>
              
              <ProjectTitleBelow>
                {projeto.title}
              </ProjectTitleBelow>
            </div>
          ))}
        </ProjectsGrid>
      </ProjectsContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps<ProjetosProps> = async () => {
  const businessSettings = getBusinessSettings();
  const generalSettings = getGeneralSettings();

  return {
    props: {
      businessSettings,
      generalSettings,
    },
  };
};

export default Projetos;
