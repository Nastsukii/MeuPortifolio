/**
 * Interface para a estrutura de Imagem (URL e Alt)
 */
export interface Image {
  url: string;
  alt: string;
}

/**
 * Interface para Tecnologias
 */
export interface Tech {
  tech: string;
  color: string;
  bgcolor: string;
}

/**
 * Interface para a estrutura de dados "Sobre Mim"
 * Utilizada na Home e páginas de perfil.
 */
export interface AboutMe {
  title: {
    default: string;
    bold: string;
  };
  description: string;
  contact: {
    link: string;
    label: string;
  };
  techs: Tech[];
  pfp: {
    image: Image;
    experience: {
      default: string;
      bold: string;
    };
  };
}

/**
 * Interface para Projetos
 */
export interface Project {
  slug: string;
  name: string;
  image: Image;
}
