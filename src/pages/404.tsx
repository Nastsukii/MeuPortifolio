import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '500',
});

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 | Luiz Antonio Comiran Bueno</title>
      </Head>
      <div className="flex flex-col items-center text-center mt-12 md:mt-24 gap-8 px-6 md:px-32">
        <h1 className="text-5xl sm:text-7xl font-bold">404</h1>
        <p className="flex flex-col gap-8 md:gap-4 md:text-xl">
          <span>Oops, we cant find this page!</span>
          <span>Click on the button below to be redirected to the Home Page</span>
        </p>
        <Link
          href="/"
          className={`${roboto.className} p-4 bg-h-blue-500 rounded-xl text-black mt-5 md:mt-12 md:text-xl w-fit`}
        >
          Go to Home Page
        </Link>
      </div>
    </>
  );
};

export default NotFound;
