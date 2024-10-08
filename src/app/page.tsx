import SignIn from "~/app/_components/signIn";
import Image from "next/image";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import BackgroundCircles from "./_components/backgroundCircles";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-primary to-tertiary text-white">
      <BackgroundCircles>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-5 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              <span className="text-accent">To-Do</span> project
            </h1>
            <div className="mx-4 my-4 flex flex-col items-center">
              <Image
                src="/img/carnet.png"
                width={250}
                height={250}
                priority={true}
                alt="Carnet de notes"
                className="my-6 animate-float"
                style={{ clipPath: "inset(3px)" }}
              />

              <p className="mb-2 mt-6 text-center">
                C&#39;est parti mon kiki !
              </p>
              <span className="mb-6 mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:animate-bounce">
                <a href="#sign-in-button">
                  <ArrowDownIcon className="h-7 w-7 rounded-full text-accent" />
                </a>
              </span>

              <SignIn />
            </div>
          </div>
        </div>
      </BackgroundCircles>
    </main>
  );
}
