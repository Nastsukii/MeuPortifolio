"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { Menu } from './Menu';
import { useCallback, useState } from 'react';
import { MenuIcon } from '@/components/icons/MenuIcon';
import { UserButton } from "@clerk/nextjs";
import dynamic from 'next/dynamic'; // Importar dynamic
import { CustomSignInButton } from "@/components/commons/clerk/SignInButton";
import { CustomSignOutButton } from "@/components/commons/clerk/SignOutButton";
import { useRouter } from 'next/router'; // Importar useRouter
import { ThemeToggle } from '@/components/commons/ThemeToggle';
import { LanguageSwitcher } from '@/components/commons/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { getMainMenu, getLogos } from '@/lib/settings';

// Importar SignedIn e SignedOut dinamicamente para garantir que sejam renderizados apenas no cliente
// @ts-expect-error
const SignedIn = dynamic(() => import("@clerk/nextjs").then((mod) => mod.SignedIn), { ssr: false });
// @ts-expect-error
const SignedOut = dynamic(() => import("@clerk/nextjs").then((mod) => mod.SignedOut), { ssr: false });

const roboto = Roboto({
  subsets: ['latin'],
  weight: '500',
});

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter(); // Obter o objeto router
  const { t } = useLanguage();
  const mainMenu = getMainMenu();
  const logos = getLogos();

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      className={`${roboto.className} bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-sm flex py-3 px-5 justify-between items-center sticky top-0 z-20 shadow-sm`}
    >
      {/* Download Resume Button */}
      <div className="flex items-center">
        <a
          href="/files/Curriculo Pt-br Luiz Antonio.pdf"
          download="Curriculo_Luiz_Antonio_Comiran_Bueno.pdf"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg neon-shadow"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t('download.resume')}
        </a>
      </div>

      {/* Mobile menu button */}
      <button className="p-1 md:hidden" onClick={openMenu}>
        <MenuIcon className="fill-gray-700 dark:fill-white w-8 h-8" />
      </button>

      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center gap-2 text-md">
        <Link
          href="/"
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            router.pathname === '/'
              ? 'bg-primary/10 dark:bg-primary/20 text-primary'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {t('navigation.home')}
        </Link>
        <Link
          href="/sobre"
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            router.pathname === '/sobre'
              ? 'bg-primary/10 dark:bg-primary/20 text-primary'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {t('navigation.about')}
        </Link>
        <Link
          href="/projetos"
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            router.pathname === '/projetos'
              ? 'bg-primary/10 dark:bg-primary/20 text-primary'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {t('navigation.projects')}
        </Link>
        <Link
          href="/blog"
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            router.pathname === '/blog'
              ? 'bg-primary/10 dark:bg-primary/20 text-primary'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {t('navigation.blog')}
        </Link>
      </nav>

      {/* Right side actions */}
      <div className="hidden md:flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && (
          <>
            <SignedIn>
              <UserButton />
              <CustomSignOutButton />
            </SignedIn>
           
            <SignedOut>
              <CustomSignInButton />
            </SignedOut>
          </>
        )}
      </div>

      <Menu isVisible={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};
