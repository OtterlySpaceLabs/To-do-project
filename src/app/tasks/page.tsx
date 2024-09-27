import CreateTask from '~/app/_components/createTask';
import SignOut from '../_components/signOut';
import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function TasksPage() {
    const session = (await getServerAuthSession())!;

    return (
        <HydrateClient>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                <div className="container flex items-center justify-end gap-12 px-5 py-16">
                    <SignOut />
                </div>
                <div className="container flex flex-col items-center justify-center gap-12 px-5 py-16">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                        <span className="text-fuchsia-400">To-Do</span> project
                    </h1>
                    <div className="mx-4">
                        <div className="flex flex-col items-center gap-2">
                            <h2 className="my-3 text-lg">Liste des tâches de {session.user.name}</h2>
                            <h2 className="my-3 text-lg">Vous pouvez ajouter une nouvelle tâche à la liste à l&apos;aide du formulaire ci-dessous :</h2>
                        </div>
                        <CreateTask />
                    </div>
                </div>
            </main>
        </HydrateClient>
    );
}
