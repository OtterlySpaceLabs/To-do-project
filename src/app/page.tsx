import SignIn from '~/app/_components/signIn';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-5 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">To-Do</span> project
        </h1>
        <div className="mx-4">
          <p className="text-center my-4">C&#39;est parti mon kiki !</p>
          <SignIn />
        </div>
      </div>
    </main>
  );
}
