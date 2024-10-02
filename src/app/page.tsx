import SignIn from '~/app/_components/signIn';
import Image from 'next/image';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import BackgroundCircles from './_components/backgroundCircles';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-primary to-tertiary text-white">
      <BackgroundCircles>
        <div className="relative z-10 flex items-center justify-center h-full">

          <div className="container flex flex-col items-center justify-center gap-12 px-5 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              <span className="text-accent">To-Do</span> project
            </h1>
            <div className="flex flex-col items-center mx-4 my-4">
              <Image
                src="/img/carnet.png"
                width={250}
                height={250}
                priority={true}
                alt="Carnet de notes"
                className="my-6 animate-float"
                style={{ clipPath: 'inset(3px)' }}
              />

              <p className="text-center mt-6 mb-2">C&#39;est parti mon kiki !</p>
              <span className="flex items-center justify-center rounded-full h-10 w-10 bg-white shadow-lg mt-2 mb-6 hover:animate-bounce">
                <a href="#sign-in-button">
                  <ArrowDownIcon className="rounded-full h-7 w-7 text-accent" />
                </a>
              </span>

              <SignIn />

            </div>
          </div>
        </div>
      </BackgroundCircles>
    </main >
  );
}
