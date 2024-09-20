"use client";

import { useState } from "react";

import { api } from "~/trpc/react";


export default function CreateTask() {

    const [task, setTask] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
        console.log("Task updated :", event.target.value);
    }

    const [tasks] = api.task.getAll.useSuspenseQuery();

    const utils = api.useUtils();

    const createTask = api.task.create.useMutation({
        onSuccess: async () => {
            await utils.task.invalidate();
            setTask("");
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (task.trim().length === 0) {
            console.error("Le champ de la tâche est vide.");
            return;
        }

        createTask.mutate({ name: task });
        console.log("Envoi de la mutation avec le nom :", task);
    };

    const deleteTask = api.task.delete.useMutation({
        onSuccess: async () => {
            // Invalidate the query to refresh the task list
            await utils.task.invalidate();
        },
    });

    const handleDelete = (id: number) => {
        deleteTask.mutate({ id });
    }

    return (
        <div>
            <form className="flex flex-col gap-3 mt-2 justify-center items-center sm:flex-row">
                <div className="w-full inline-flex items-center justify-center sm:w-50">
                    <label htmlFor="task" className="sr-only">
                        Tâche
                    </label>
                    <input
                        id="task"
                        name="task"
                        type="text"
                        placeholder="Créer une nouvelle tâche"
                        className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={task}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full inline-flex items-center justify-center rounded-md px-3 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-0 sm:w-auto ${task.trim().length === 0
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600"
                        }`} onClick={handleSubmit}
                    disabled={task.trim().length === 0}
                >
                    Ajouter
                </button>
            </form>
            <div className="flex flex-col items-center gap-2 mt-4">
                <h2 className="font-semibold text-xl">Liste des tâches</h2>
                <ul role="list" className="space-y-3">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <li key={task.id} className="mt-4">
                                <span className="overflow-hidden text-[hsl(280,100%,70%)] bg-white px-6 py-3 shadow rounded-md mr-4">{task.task}</span>
                                <button onClick={() => handleDelete(task.id)} className="bg-[hsl(280,100%,70%)] px-6 py-2.5 rounded-md">Supprimer</button>
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-4">Vous n&apos;avez pas encore de tâches créées.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}