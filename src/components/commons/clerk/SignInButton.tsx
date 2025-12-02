import { SignInButton } from "@clerk/nextjs";
import { useLanguage } from '@/contexts/LanguageContext';

export function CustomSignInButton() {
  const { t } = useLanguage();
  
  return (
    <SignInButton mode="modal">
      <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded">
        {t('auth.signIn')}
      </button>
    </SignInButton>
  );
}
