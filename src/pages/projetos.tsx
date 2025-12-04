import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';
import { useUser } from '@clerk/nextjs';

interface ProjetosProps {
  businessSettings: any;
  generalSettings: any;
}

interface Projeto {
  id: number;
  title: string;
  videoUrl: string;
  link: string;
  funcionalidades: string[];
  tecnologias: string[];
  featured: boolean;
}

const Projetos = ({ businessSettings, generalSettings }: ProjetosProps) => {
  const { t } = useLanguage();
  const { isSignedIn, user, isLoaded } = useUser();
  
  const projetos: Projeto[] = [
    {
      id: 1,
      title: "Vivieli Terapia",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://vivieliterapia.netlify.app",
      funcionalidades: [
        "Homepage com Hero e serviços",
        "Blog em Markdown com categorias/tags",
        "Tema claro/escuro",
        "Responsividade (desktop/mobile)",
        "SEO básico (meta, OG/Twitter)",
        "Imagens otimizadas e code splitting",
        "Deploy CI/CD (Vercel/Netlify)",
        "LGPD e HTTPS"
      ],
      tecnologias: [
        "Next.js 14",
        "React 18",
        "Tailwind CSS",
        "CSS",
        "ESLint",
        "next-themes",
        "react-icons",
        "gray-matter",
        "remark",
        "date-fns",
        "Markdown",
        "JSON",
        "Netlify",
        "Vercel",
        "Git",
        "npm/yarn"
      ],
      featured: true
    },
    {
      id: 2,
      title: "NotaIA",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://notaia.netlify.app",
      funcionalidades: [
        "Leitura e análise de documentos",
        "Fluxo de geração de arquivos",
        "Interface simples para upload",
        "Deploy contínuo"
      ],
      tecnologias: [
        "Next.js App Router",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "PostCSS + Autoprefixer",
        "ESLint",
        "Framer Motion",
        "Lucide React",
        "clsx",
        "Netlify",
        ".env.local"
      ],
      featured: true
    },
    {
      id: 3,
      title: "Projeto 3",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["Next.js", "PostgreSQL", "Prisma", "API REST"],
      featured: true
    },
    {
      id: 4,
      title: "Projeto 4",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["Node.js", "Express", "JWT", "Swagger"],
      featured: false
    },
    {
      id: 5,
      title: "Projeto 5",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["React", "CSS3", "JavaScript", "HTML5"],
      featured: false
    },
    {
      id: 6,
      title: "Projeto 6",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["Next.js", "API REST", "Tailwind", "TypeScript"],
      featured: false
    },
    {
      id: 7,
      title: "Projeto 7",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["React", "Firebase", "Material UI", "JavaScript"],
      featured: false
    },
    {
      id: 8,
      title: "Projeto 8",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["Node.js", "SQL", "Express", "Bootstrap"],
      featured: false
    },
    {
      id: 9,
      title: "Projeto 9",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["React", "GraphQL", "Apollo", "Styled Components"],
      featured: false
    },
    {
      id: 10,
      title: "Projeto 10",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["Next.js", "Vercel", "Netlify", "Git"],
      featured: false
    }
  ];

  const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto>(projetos[0]);
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const painelCentralRef = useRef<HTMLDivElement>(null);
  const [mostrarNotificacao, setMostrarNotificacao] = useState(false);
  
  // Refs para controlar timers e prevenir spam
  const timerNotificacaoRef = useRef<NodeJS.Timeout | null>(null);
  const ultimoClickRef = useRef<number>(0);
  const throttleDelayLogin = 2000; // 2 segundos para login

  // Carregar curtidas do localStorage ao montar
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded && isSignedIn) {
      const savedLikes = localStorage.getItem('projectLikes');
      if (savedLikes) {
        try {
          setLikes(JSON.parse(savedLikes));
        } catch (e) {
          console.error('Erro ao carregar curtidas:', e);
        }
      }
    }
  }, [isSignedIn, isLoaded]);

  // Limpar curtidas quando deslogar
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setLikes({});
    }
  }, [isSignedIn, isLoaded]);

  // Limpar timer ao desmontar componente
  useEffect(() => {
    return () => {
      if (timerNotificacaoRef.current) {
        clearTimeout(timerNotificacaoRef.current);
      }
    };
  }, []);

  // Função auxiliar para mostrar notificação de login
  const mostrarNotificacaoLogin = (duracao: number) => {
    // Cancela notificação anterior se existir
    if (timerNotificacaoRef.current) {
      clearTimeout(timerNotificacaoRef.current);
    }
    
    // Esconde notificação anterior imediatamente
    setMostrarNotificacao(false);
    
    // Pequeno delay para garantir que a animação reinicie
    setTimeout(() => {
      setMostrarNotificacao(true);
      
      // Agenda esconder notificação
      timerNotificacaoRef.current = setTimeout(() => {
        setMostrarNotificacao(false);
        timerNotificacaoRef.current = null;
      }, duracao);
    }, 50);
  };

  // Função para curtir/descurtir (otimizada contra spam)
  const toggleLike = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const agora = Date.now();
    
    // === CASO 1: Usuário NÃO autenticado ===
    if (!isSignedIn) {
      // Throttle: Só mostra notificação se passou tempo suficiente
      if (agora - ultimoClickRef.current < throttleDelayLogin) {
        // Muito rápido, ignora o click completamente
        return;
      }
      
      ultimoClickRef.current = agora;
      mostrarNotificacaoLogin(4000);
      return;
    }
    
    // === CASO 2: Usuário AUTENTICADO ===
    // Salva a curtida sem mostrar notificação
    const newLikes = { ...likes };
    newLikes[projectId] = !newLikes[projectId];
    setLikes(newLikes);
    localStorage.setItem('projectLikes', JSON.stringify(newLikes));
  };

  // Verificar se projeto está curtido
  const isLiked = (projectId: number) => {
    return likes[projectId] || false;
  };

  // Função para selecionar projeto e rolar até o painel
  const selecionarProjeto = (projeto: Projeto) => {
    setProjetoSelecionado(projeto);
    
    // Rolar suavemente até o painel central com offset
    setTimeout(() => {
      if (painelCentralRef.current) {
        const elementPosition = painelCentralRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 70; // 70px de margem superior
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <>
      <Head>
        <title>{`${t('projects.title')} | ${businessSettings.brandName}`}</title>
        <meta
          name="description"
          content={`Confira os projetos desenvolvidos por ${businessSettings.brandName} - Desenvolvedor web especializado em soluções modernas`}
        />
        <meta property="og:title" content={`${t('projects.title')} | ${businessSettings.brandName}`} />
        <meta property="og:description" content={`Confira os projetos desenvolvidos por ${businessSettings.brandName} - Desenvolvedor web especializado em soluções modernas`} />
      </Head>

      {/* Notificação de Login */}
      {mostrarNotificacao && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-4 rounded-lg shadow-2xl neon-shadow flex items-center gap-3 min-w-[320px]">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <p className="font-semibold text-base">{t('projects.like.loginRequired')}</p>
              <p className="text-sm text-primary/80">{t('projects.like.loginMessage')}</p>
            </div>
            <button 
              onClick={() => setMostrarNotificacao(false)}
              className="ml-2 hover:bg-white/20 rounded p-1 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Cabeçalho */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('projects.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('projects.subtitle')}
            </p>
          </div>
        </div>

        {/* Layout Principal */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Esquerda - Lista de Projetos */}
            <aside className="lg:w-80 shrink-0">
              <div className="space-y-3 sticky top-24">
                {projetos.map((projeto) => (
                  <div
                    key={projeto.id}
                    onClick={() => selecionarProjeto(projeto)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selecionarProjeto(projeto);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Selecionar ${t('projects.projectNumber')} ${projeto.id}`}
                    className={`w-full text-left px-5 py-4 rounded-lg transition-all duration-200 shadow-lg relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                      projetoSelecionado.id === projeto.id
                        ? 'bg-primary text-primary-foreground border-2 border-primary shadow-primary/30'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 shadow-gray-300/50 dark:shadow-gray-900/50'
                    }`}
                  >
                      {/* Badge de Destaque no canto superior esquerdo */}
                      {projeto.featured && (
                        <span className="absolute top-1.5 left-1.5 text-[10px]">
                          ⭐
                        </span>
                      )}

                      {/* Botão de Curtir no canto superior direito */}
                      <button
                        onClick={(e) => toggleLike(projeto.id, e)}
                        className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 ${
                          isLiked(projeto.id)
                            ? 'bg-red-500 hover:bg-red-600'
                            : projetoSelecionado.id === projeto.id
                            ? 'bg-white/20 hover:bg-white/30'
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        title={isSignedIn ? (isLiked(projeto.id) ? 'Descurtir' : 'Curtir') : 'Faça login para curtir'}
                      >
                        <svg 
                          className={`w-4 h-4 ${
                            isLiked(projeto.id) 
                              ? 'text-white dark:text-primary-foreground' 
                              : projetoSelecionado.id === projeto.id
                              ? 'text-white dark:text-primary-foreground'
                              : 'text-gray-600 dark:text-gray-300'
                          }`}
                          fill={isLiked(projeto.id) ? 'currentColor' : 'none'} 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                          />
                        </svg>
                      </button>

                      <div className="mb-2 pr-8">
                        <div className="mb-1">
                          <span
                            className={`font-semibold text-base ${
                              projetoSelecionado.id === projeto.id
                                ? 'text-[#808080] dark:text-[#808080]'
                                : ''
                            }`}
                          >
                            {projeto.title}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {projeto.tecnologias.map((tech, index) => (
                          <span
                            key={index}
                            className={`text-xs px-2 py-0.5 rounded ${
                              projetoSelecionado.id === projeto.id
                                ? 'bg-white/20 text-[#808080] dark:text-[#808080]'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Painel Central - Detalhes do Projeto */}
            <main className="flex-1" ref={painelCentralRef}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
                
                {/* Título do Projeto */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      {projetoSelecionado.title}
                    </h2>
                    {projetoSelecionado.featured && (
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full neon-shadow">
                        {t('projects.featuredBadge')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Layout: Funcionalidades (esquerda) + Vídeo (direita) */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                  
                  {/* Funcionalidades - Esquerda */}
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t('projects.features')}
                    </h3>
                    <ul className="space-y-3">
                      {projetoSelecionado.funcionalidades.map((func, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                          <span className="text-primary text-xl mt-0.5">•</span>
                          <span className="text-base">{func}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Vídeo + Link - Direita */}
                  <div className="lg:col-span-3">
                    {/* Vídeo */}
                    <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md mb-3">
                      <iframe
                        src={projetoSelecionado.videoUrl}
                        title={`${t('projects.projectNumber')} ${projetoSelecionado.id}`}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                    
                    {/* Link do Projeto abaixo do vídeo */}
                    <div className="text-center">
                      <a
                        href={projetoSelecionado.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-800 dark:text-white underline hover:text-primary font-semibold text-lg"
                      >
                        {t('projects.accessProject')}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Tecnologias - Embaixo de tudo (full width) */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    {t('projects.technologies')}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {projetoSelecionado.tecnologias.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/10 dark:bg-primary/20 text-gray-800 dark:text-gray-100 text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>


        {/* CTA Section */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('projects.interested.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('projects.interested.description')}
            </p>
            <Link
              href="/contato"
              className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 neon-shadow"
            >
              {t('projects.interested.getInTouch')}
            </Link>
          </div>
        </div>
      </div>
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
