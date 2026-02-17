export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  link: string;
  imgUrl?: string; // Optional, will be generated if not provided
  tecnologias: string[];
  funcionalidades: string[];
  description: string; // Short description for the card
  fullDescription: string; // Long description for the details page
  story: string; // The "story" behind the project
  year: number;
  role: string;
}

export const projectsData: ProjectData[] = [
  {
    id: 1,
    slug: "vivieli-terapia",
    title: "Vivieli Terapia",
    link: "https://vivieliterapia.netlify.app",
    tecnologias: ["Next.js 14", "React 18", "Tailwind CSS", "Markdown", "Netlify"],
    funcionalidades: ["Blog com Markdown", "Sistema de Agendamento", "Tema Dark/Light", "SEO Otimizado"],
    description: "Plataforma completa para terapia online com blog e agendamento.",
    fullDescription: "A Vivieli Terapia é uma plataforma digital desenvolvida para facilitar o acesso a serviços de psicologia e terapia. O site oferece uma apresentação profissional da terapeuta, explicações detalhadas sobre as abordagens utilizadas e um blog rico em conteúdo sobre saúde mental.",
    story: "Identifiquei a necessidade de profissionais de saúde mental terem uma presença digital forte e acessível. A Vivieli precisava de um espaço onde pudesse não apenas divulgar seu trabalho, mas também educar seu público através de artigos. O desafio foi criar uma interface acolhedora e confiável, mas tecnologicamente robusta.",
    year: 2025,
    role: "Full Stack Developer"
  },
  {
    id: 2,
    slug: "decisorio",
    title: "Decisorio",
    link: "https://decisorio.netlify.app",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide Icons"],
    funcionalidades: ["Algoritmo de Decisão", "Interface Intuitiva", "Suporte Bilíngue"],
    description: "Ferramenta interativa para auxiliar na tomada de decisões complexas.",
    fullDescription: "O Decisorio é uma aplicação web focada em ajudar usuários a tomarem decisões difíceis de forma lógica e estruturada. Através de um questionário interativo e pesos atribuídos a diferentes critérios, o sistema calcula a melhor opção baseada nas entradas do usuário.",
    story: "Tomar decisões pode ser paralisante. Criei o Decisorio pensando em como a lógica de programação poderia ser aplicada a dilemas cotidianos. O projeto nasceu de um experimento pessoal para quantificar escolhas subjetivas e evoluiu para uma ferramenta útil para qualquer pessoa indecisa.",
    year: 2025,
    role: "Frontend Developer"
  },
  {
    id: 3,
    slug: "highticonversionfunnel",
    title: "High Conversion Funnel",
    link: "https://highticonversionfunnel.netlify.app",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    funcionalidades: ["Funil de Vendas", "Landing Page Otimizada", "Alta Performance", "Analytics"],
    description: "Template de alta conversão para produtos digitais.",
    fullDescription: "Este projeto é um template de funil de vendas meticulosamente otimizado para maximizar a taxa de conversão. Focado em infoprodutos, ele utiliza gatilhos mentais visuais, carregamento instantâneo e uma jornada de usuário fluida para guiar o visitante até a compra.",
    story: "No mercado digital, cada milissegundo conta. Desenvolvi este funil após estudar as landing pages dos maiores players do mercado. O objetivo era criar uma estrutura reutilizável que garantisse performance técnica impecável (Lighthouse 100) aliada a um design persuasivo.",
    year: 2025,
    role: "Web Developer"
  },
  {
    id: 4,
    slug: "to-do-list",
    title: "To Do List",
    link: "https://to-do-list-lacb-test-1.netlify.app",
    tecnologias: ["JavaScript", "HTML5", "CSS3", "LocalStorage"],
    funcionalidades: ["Gestão de Tarefas", "Persistência de Dados", "CRUD Completo", "Filtros de Status"],
    description: "Aplicação clássica de lista de tarefas com persistência local.",
    fullDescription: "Uma aplicação robusta de gerenciamento de tarefas que permite criar, editar, excluir e marcar tarefas como concluídas. Todo o estado é persistido no LocalStorage do navegador, garantindo que o usuário não perca seus dados ao atualizar a página.",
    story: "Todo desenvolvedor precisa dominar o básico. Este projeto foi meu 'campo de treinamento' para solidificar conceitos de manipulação do DOM e gerenciamento de estado sem frameworks. A simplicidade aparente esconde uma lógica cuidadosa de tratamento de eventos e persistência de dados.",
    year: 2025,
    role: "Frontend Developer"
  },
  {
    id: 5,
    slug: "notaia",
    title: "NotaIA",
    link: "https://notaia.netlify.app",
    tecnologias: ["React 19", "AI SDK", "Tailwind CSS", "Framer Motion"],
    funcionalidades: ["Geração de Notas", "Inteligência Artificial", "Interface Minimalista", "Exportação"],
    description: "SaaS de geração de notas fiscais e documentos com IA.",
    fullDescription: "NotaIA é uma prova de conceito de um SaaS que utiliza Inteligência Artificial para automatizar a criação e organização de notas e documentos simples. O usuário insere os dados brutos e a IA formata e categoriza as informações.",
    story: "Com a ascensão das LLMs, vi a oportunidade de automatizar tarefas burocráticas. O NotaIA nasceu da frustração com a papelada manual. Integrando a API da OpenAI, criei um assistente que transforma comandos de voz ou texto desestruturado em documentos padronizados.",
    year: 2025,
    role: "Full Stack Engineer"
  },
  {
    id: 6,
    slug: "devcafe",
    title: "DevCafé",
    link: "https://cafeteria-dev-ten.vercel.app",
    tecnologias: ["HTML5", "CSS3", "JavaScript", "AOS Animation"],
    funcionalidades: ["Cardápio Digital", "Animações ao Rolar", "Design Responsivo", "Formulário de Contato"],
    description: "Landing page temática para uma cafeteria focada em desenvolvedores.",
    fullDescription: "O DevCafé é um site conceitual para uma cafeteria fictícia que serve como ponto de encontro para programadores. O design brinca com terminologias de código (café 'Java', sanduíche 'Python') e oferece uma experiência visual rica com animações suaves.",
    story: "Queria criar algo divertido e visualmente atraente que fugisse dos layouts corporativos padrão. O DevCafé foi um exercício de criatividade e design UI/UX, focado em criar uma atmosfera e uma marca através do código e do estilo visual.",
    year: 2026,
    role: "UI/UX Designer & Dev"
  },
   {
    id: 7,
    slug: "logindevclub",
    title: "Login DevClub - Clone",
    link: "https://dev-club-interface-login.vercel.app/",
    tecnologias: ["HTML5", "CSS3", "VAR CSS"],
    funcionalidades: ["Tela de Login", "Clone de uma Tela", "Bonita", "Formulário de Login não funcional"],
    description: "Clone da tela de Login do curso DevClub",
    fullDescription: "Esta tela de Login foi feita com o objetivo de aprender a clonar interfaces de sites e aplicações. Foi um exercício de criatividade e design UI/UX, focado em criar uma atmosfera e uma marca através do código e do estilo visual.",
    story: "Queria aprender a clonar interfaces de sites e aplicações. Foi um exercício de criatividade e design UI/UX, focado em criar uma atmosfera e uma marca através do código e do estilo visual.",
    year: 2026,
    role: "UI/UX Designer & Dev"
  }
];
