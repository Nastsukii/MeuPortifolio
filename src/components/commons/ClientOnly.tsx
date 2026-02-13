import React, { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

/**
 * Componente Wrapper para renderização exclusiva no cliente.
 * Útil para evitar erros de hidratação quando o conteúdo depende de APIs do navegador (ex: window, localStorage)
 * ou quando bibliotecas de terceiros não suportam SSR corretamente.
 */
export const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};
