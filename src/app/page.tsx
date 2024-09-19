// import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
import CreateTask from '~/app/_components/createtask';
// import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";


export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-5 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">To-Do</span> project
          </h1>
          <div className="mx-4">
            <div className="flex flex-col items-center gap-2">
              <h2 className="my-3 text-lg">Vous pouvez ajouter une nouvelle tâche à la liste à l&apos;aide du formulaire ci-dessous :</h2>
            </div>
            <CreateTask />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="font-semibold text-xl">Liste des tâches</h2>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
