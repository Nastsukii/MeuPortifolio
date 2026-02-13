/**
 * Configurações estáticas do site
 * Evita problemas com fs no cliente e centraliza dados de configuração.
 */

const businessSettingsPT = {
  "brandName": "Luiz Antonio Comiran Bueno",
  "brandDescription": "Desenvolvedor web apaixonado por criar soluções eficientes e práticas.",
  "brandEmail": "comiranbueno0@gmail.com",
  "brandKeywords": ["Desenvolvedor Web", "Portfolio", "JavaScript", "Next.js", "React", "Node.js"],
  "brandPhone": "+55 45 99938-3320"
};

const businessSettingsEN = {
  "brandName": "Luiz Antonio Comiran Bueno",
  "brandDescription": "Web developer passionate about delivering efficient and practical solutions.",
  "brandEmail": "comiranbueno0@gmail.com",
  "brandKeywords": ["Web Developer", "Portfolio", "JavaScript", "Next.js", "React", "Node.js"],
  "brandPhone": "+55 45 99938-3320"
};

const generalSettings = {
  "siteUrl": "https://luiz-antonio-comiran-bueno.vercel.app",
  "footerText": "© 2025 Lacb. Todos os direitos reservados. Construído com Next.js e muito ☕.",
  "postsToShow": 6,
  "homeCategory": "Development",
  "cookieConsent": false,
  "darkModeSwitcher": true,
  "feedbackEmail": "comiranbueno0@gmail.com",
  "publishedDate": "2025-01-15 00:00:00",
  "i18n": "en",
  "errorMessage": "Oops... something went wrong. Please try again later or contact us: comiranbueno0@gmail.com"
};

const themeSettings = {
  "postsSettings": {
    "postsToShow": 6,
    "postMaxW": "800",
    "leftColumn": false,
    "rightColumn": false,
    "bottomRow": true,
    "adsInsidePost": false,
    "postStyleVariation": "0"
  },
  "pagesSettings": {
    "pageBottomPadding": 30,
    "pageHeaderPadding": 22,
    "pageMaxW": "1100"
  },
  "header": {
    "logoAlign": "left",
    "headerHeight": 60,
    "bottomMainMenu": false,
    "headerMainMenu": "right",
    "headerMainMenuType": "simple"
  },
  "themeColors": {
    "brand_color": "#3b82f6",
    "ctaColor": "#3b82f6",
    "background_color": "#ffffff",
    "darkBrandColor": "#60a5fa",
    "secondaryColor": "#1e293b",
    "darkBackgroundColor": "#0f172a"
  },
  "generalThemeSettings": {
    "themeStyle": "modern"
  }
};

const logos = {
  "faviconLogo": "/favicon.svg",
  "mainLogo": "/img/foto perfil.jpeg",
  "markLogo": "/img/foto perfil.jpeg",
  "cardLogo": "/img/foto perfil.jpeg",
  "postAuthorLogo": "/img/foto perfil.jpeg",
  "mainLogoWH": "375x375"
};

const mainMenu = {
  "mainMenu": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "About",
      "href": "/sobre"
    },
    {
      "label": "Projects",
      "href": "/projetos"
    },
    {
      "label": "Contact",
      "href": "/contato"
    }
  ]
};

const linkTreeData = {
  "linkTree": [
    {
      "href": "https://www.linkedin.com/in/luiz-antonio-comiran-bueno/",
      "label": "LinkedIn",
      "icon": "FaLinkedin"
    },
    {
      "href": "https://github.com/Nastsukii",
      "label": "GitHub",
      "icon": "FaGithub"
    },
    {
      "href": "mailto:comiranbueno0@gmail.com",
      "label": "Email",
      "icon": "FaEnvelope"
    }
  ]
};

/**
 * Retorna as configurações de negócio baseadas no idioma atual.
 * @returns {Object} Configurações de negócio (nome, email, telefone, etc.)
 */
export const getBusinessSettings = () => {
  // Verifica se está no cliente
  if (typeof window !== 'undefined') {
    // Pega o idioma do localStorage ou usa o padrão
    const language = localStorage.getItem('language') || 'pt';
    return language === 'pt' ? businessSettingsPT : businessSettingsEN;
  }
  // No servidor, retorna o padrão em português
  return businessSettingsPT;
};

/**
 * Retorna as configurações gerais do site.
 * @returns {Object} Settings gerais (URL, footer, etc.)
 */
export const getGeneralSettings = () => {
  return generalSettings;
};

/**
 * Retorna as configurações visuais do tema.
 * @returns {Object} Cores, tamanhos e estilos.
 */
export const getThemeSettings = () => {
  return themeSettings;
};

/**
 * Retorna os caminhos dos logos.
 * @returns {Object} Paths para diferentes versões do logo.
 */
export const getLogos = () => {
  return logos;
};

/**
 * Retorna a estrutura do menu principal.
 * @returns {Object} Array de itens de menu.
 */
export const getMainMenu = () => {
  return mainMenu;
};

/**
 * Retorna dados para árvore de links (social).
 * @returns {Object} Array de links sociais.
 */
export const getLinkTreeData = () => {
  return linkTreeData;
};

/**
 * Retorna configurações de integração (ex: APIs externas).
 * @returns {Object} Configurações vazias (placeholder).
 */
export const getIntegrations = () => {
  return {};
};

/**
 * Retorna informações de versão do projeto.
 * @returns {Object} Versão e mensagem.
 */
export const getVersionInfo = () => {
  return {
    version: "1.0.0",
    nextVersion: "13.5.7",
    message: "Portfolio pessoal - Luiz Antonio Comiran Bueno"
  };
};
