import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('pt')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          language === 'pt'
            ? 'bg-primary text-primary-foreground'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          language === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        EN
      </button>
    </div>
  );
};
