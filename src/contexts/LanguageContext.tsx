import React, { createContext, useContext, useState, useEffect } from 'react';

// Importar as traduções
import ptTranslations from '../../public/locales/pt/common.json';
import enTranslations from '../../public/locales/en/common.json';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: ptTranslations,
  en: enTranslations,
};

/**
 * Provedor de Contexto de Idioma
 * Gerencia o estado global do idioma (pt ou en) e fornece função de tradução 't'.
 * Persiste a preferência do usuário no localStorage.
 */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    // Carregar idioma do localStorage apenas no cliente
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  /**
   * Função de tradução
   * @param key Chave de tradução (ex: 'home.title' ou 'button.label')
   * @returns O valor traduzido ou a própria chave se não encontrado.
   */
  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Retorna a chave se não encontrar a tradução
      }
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook para acessar o contexto de idioma.
 * @returns {LanguageContextType} O contexto de idioma contendo idioma atual, setter e função de tradução.
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
