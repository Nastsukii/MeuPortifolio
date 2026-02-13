import { MenuCloseIcon } from '@/components/icons/MenuCloseIcon';
import { ThemeToggle } from '@/components/commons/ThemeToggle';
import { LanguageSwitcher } from '@/components/commons/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CustomSignInButton } from "@/components/commons/clerk/SignInButton";
import { CustomSignOutButton } from "@/components/commons/clerk/SignOutButton";
import { UserButton } from "@clerk/nextjs";

// Importar componentes do Clerk dinamicamente para evitar erros de SSR
// @ts-expect-error - Clerk types definition issue
const SignedIn = dynamic(() => import("@clerk/nextjs").then((mod) => mod.SignedIn), { ssr: false });
// @ts-expect-error - Clerk types definition issue
const SignedOut = dynamic(() => import("@clerk/nextjs").then((mod) => mod.SignedOut), { ssr: false });

interface MenuProps {
  isVisible: boolean;
  onClose: () => void;
}

/**
 * Menu Mobile
 * Modal de navegação para dispositivos móveis.
 * Inclui navegação, troca de tema/idioma e autenticação.
 */
export const Menu = ({ isVisible, onClose }: MenuProps) => {
  const { t } = useLanguage();

  return (
    <div
      className={`${isVisible ? 'flex' : 'hidden'}
      fixed inset-0 w-full h-full bg-black bg-opacity-40 backdrop-blur-sm md:hidden z-50
    `}
      onClick={onClose}
    >
      <div
        className="w-full bg-white dark:bg-gray-900 h-auto min-h-[50%] shadow-md py-4 px-5 rounded-b-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Menu: Perfil e Controles */}
        <div className="flex justify-between mb-5 items-center">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <Image
              src="/img/foto perfil.jpeg"
              alt="Luiz Antonio Comiran Bueno"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-lg truncate max-w-[150px]">
              Luiz Antonio
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <button onClick={onClose} aria-label="Fechar menu">
              <MenuCloseIcon className="fill-gray-700 dark:fill-white w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Links de Navegação */}
        <nav className="flex flex-col gap-5 text-xl p-5 items-center">
          <Link
            href="/"
            onClick={onClose}
            className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200"
          >
            {t('navigation.home')}
          </Link>
          <Link
            href="/sobre"
            onClick={onClose}
            className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200"
          >
            {t('navigation.about')}
          </Link>
          <Link
            href="/projetos"
            onClick={onClose}
            className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200"
          >
            {t('navigation.projects')}
          </Link>
          <Link
            href="/blog"
            onClick={onClose}
            className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200"
          >
            {t('navigation.blog')}
          </Link>
          <Link
            href="/contato"
            onClick={onClose}
            className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200"
          >
            {t('navigation.contact')}
          </Link>

          {/* Seção de Autenticação */}
          {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && (
            <div className="mt-4 flex flex-col gap-3 items-center w-full pt-4 border-t border-gray-200 dark:border-gray-700">
              <SignedIn>
                <div className="flex items-center gap-3">
                  <UserButton />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {t('auth.loggedIn') || 'Logado'}
                  </span>
                </div>
                <div className="mt-2">
                  <CustomSignOutButton />
                </div>
              </SignedIn>
              
              <SignedOut>
                <CustomSignInButton />
              </SignedOut>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};
