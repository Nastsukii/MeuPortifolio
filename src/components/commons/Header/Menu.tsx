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

// Importar SignedIn e SignedOut dinamicamente
// @ts-expect-error
const SignedIn = dynamic(() => import("@clerk/nextjs").then((mod) => mod.SignedIn), { ssr: false });
// @ts-expect-error
const SignedOut = dynamic(() => import("@clerk/nextjs").then((mod) => mod.SignedOut), { ssr: false });

interface MenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Menu = ({ isVisible, onClose }: MenuProps) => {
  const { t } = useLanguage();

  return (
    <div
      className={`${isVisible ? 'flex' : 'hidden'}
      fixed inset-0 w-full h-full bg-black bg-opacity-40 backdrop-blur-sm md:hidden
    `}
      onClick={onClose}
    >
      <div
        className="w-full bg-white dark:bg-gray-900 h-96 shadow-md py-4 px-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/img/foto perfil.jpeg"
              alt="Luiz Antonio Comiran Bueno"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-bold text-gray-900 dark:text-white text-lg">
              Luiz Antonio Comiran Bueno
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <button onClick={onClose}>
              <MenuCloseIcon className="fill-gray-700 dark:fill-white w-8 h-8" />
            </button>
          </div>
        </div>
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

          {/* Botões de Login */}
          {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && (
            <div className="mt-4 flex flex-col gap-3 items-center w-full">
              <SignedIn>
                <div className="flex items-center gap-3">
                  <UserButton />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {t('auth.loggedIn') || 'Logged in'}
                  </span>
                </div>
                <CustomSignOutButton />
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
