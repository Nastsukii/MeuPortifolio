import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingContactButton } from './FloatingContactButton';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout Principal da Aplicação
 * Envolve o conteúdo das páginas com o Cabeçalho (Header), Rodapé (Footer)
 * e elementos flutuantes comuns (Botão de Contato e Toggle de Tema - via Header).
 */
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {/* Botão flutuante de WhatsApp/Contato */}
      <FloatingContactButton />
    </div>
  );
};
