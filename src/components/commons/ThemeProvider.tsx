'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Provedor de Tema (Dark/Light Mode)
 * Wrapper em torno do `next-themes` para gerenciar o tema da aplicação.
 * Suporta preferência do sistema e persistência local.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
};
