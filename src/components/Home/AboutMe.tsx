import Image from 'next/image';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { AboutMe as TAboutMe } from '@/types/Home';
import { useLanguage } from '@/contexts/LanguageContext';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
});

interface AboutMeProps {
  aboutMe: TAboutMe;
}

/**
 * @deprecated Este componente parece ser uma versão antiga/alternativa do Hero e não é utilizado na HomePage atual.
 * A HomePage usa o componente 'Inicio' de 'src/components/Home/Inicio.tsx'.
 */
export const AboutMe = ({ aboutMe }: AboutMeProps) => {
  const { title, description, contact, pfp, techs } = aboutMe;
  const { t } = useLanguage();

  return (
    <main className="flex flex-wrap-reverse justify-center items-center gap-10 md:gap-32 py-8 text-lg text-center xl:text-left xl:flex-nowrap xl:justify-between">
      <div className="text-white flex flex-col items-center xl:items-start gap-4 w-full xl:w-120">
        <h1 className="text-3xl sm:text-7xl xl:leading-[5rem] text-white">
          {title.default} <strong>{title.bold}</strong>
        </h1>
        <div className="mb-12">
          <h2 className={`${roboto.className} mb-12 text-gray-200`}>
            {description || "Web developer passionate about delivering efficient and practical solutions."}
          </h2>
          <Link
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-h-gray-500 w-fit text-xl rounded-lg transition-all hover:bg-opacity-80 inline-block text-white"
          >
            {contact.label}
          </Link>
        </div>

        <ul className="flex flex-wrap justify-center xl:grid xl:grid-cols-2 xl:w-fit gap-3 text-xl">
          {techs.map(({ tech, bgcolor, color }, index) => (
            <li
              key={tech + index}
              style={{ backgroundColor: bgcolor, color: color }}
              className="w-fit p-2 rounded-md font-medium"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <Image
          src={pfp.image.url}
          alt={pfp.image.alt}
          unoptimized
          width={375}
          height={375}
          className="rounded-full shadow-xl"
          priority
        />
        <div className="p-3 w-fit text-base leading-tight bg-h-blue-500 rounded-xl text-black absolute -bottom-[0.75rem] sm:bottom-3 shadow-lg">
          <strong className="text-2xl block">{t('about.education.degree')}</strong>
          <span>{t('about.education.degreeShort')}</span>
        </div>
      </div>
    </main>
  );
};
