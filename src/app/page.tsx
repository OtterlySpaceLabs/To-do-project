import SignIn from '~/app/_components/signIn';
import Image from 'next/image';
import { ArrowDownIcon } from '@heroicons/react/24/outline';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-primary to-tertiary text-white">
      <div className="relative w-full h-screen overflow-hidden">
        {/* Cercle 1 */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl opacity-50"></div>
        {/* Cercle 2 */}
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-primary rounded-full blur-2xl opacity-50"></div>
        {/* Cercle 3 */}
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-tertiary rounded-full blur-3xl opacity-50"></div>
        {/* Cercle 4 */}
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent rounded-full blur-2xl opacity-50"></div>
        {/* Contenu principal */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="container flex flex-col items-center justify-center gap-12 px-5 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              <span className="text-accent">To-Do</span> project
            </h1>
            <div className="flex flex-col items-center mx-4 my-4">
              {/* <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/design/DO1F8VwyErAWjonbTLgGj3/SALY---3D-Illustration-Pack-(Community)?node-id=234-8&embed-host=share" allowfullscreen></iframe> */}
              <Image
                src="/img/carnet.png"
                width={250}
                height={250}
                priority={true}
                alt="Carnet de notes"
                className="animate-float"
                style={{ clipPath: 'inset(3px)' }}
              />

              <p className="text-center my-4">C&#39;est par ici !</p>
              <span className="flex items-center justify-center rounded-full h-10 w-10 bg-white shadow-lg mt-4 mb-6 hover:animate-bounce">
                <ArrowDownIcon className="rounded-full h-7 w-7 text-accent" />
              </span>

              <SignIn />
            </div>
          </div>
        </div>
      </div>
    </main >
  );
}
