"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { PencilIcon } from '@heroicons/react/24/outline';
import { type Task } from "~/server/db/schema";

import Loader from "./loader";

export default function CreateTask() {
    const [task, setTask] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
    // const [isError, setIsError] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    }

    const { data, isLoading, error } = api.task.getAll.useQuery();

    const tasks = data ?? [];

    const utils = api.useUtils();

    const createTask = api.task.create.useMutation({
        onSuccess: async () => {
            await utils.task.invalidate();
            setTask("");
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (task.trim().length === 0) {
            console.error("Le champ de la tâche est vide.");
            return;
        }

        createTask.mutate({ name: task });
        console.log("Envoi de la mutation avec le nom :", task);
    };

    const deleteTaskMutation = api.task.delete.useMutation({
        onSuccess: async () => {
            await utils.task.getAll.invalidate();
        },
    });

    const updateTaskMutation = api.task.update.useMutation({
        onSuccess: async () => {
            await utils.task.getAll.invalidate();
        },
    });

    const handleDelete = (id: number) => {
        deleteTaskMutation.mutate({ id });
    };

    const handleEditTask = (task: Task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const handleUpdateTask = () => {
        updateTaskMutation.mutate({ id: taskToEdit?.id ?? 0, name: taskToEdit?.task ?? "" });
        setIsModalOpen(false);
        setTaskToEdit(null);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setTaskToEdit(null);
    };

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
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <div className="text-red-500">Erreur lors du chargement des tâches : {error.message}</div>
                ) : (
                    <ul role="list" className="space-y-3">
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <li key={task.id} className="flex justify-between items-center gap-5 mt-4">
                                    <span className="overflow-hidden text-[hsl(280,100%,70%)] bg-white px-6 py-3 shadow rounded-md mr-4">{task.task}</span>
                                    <span onClick={() => handleEditTask(task)}>
                                        <PencilIcon className="h-6 w-6 text-[#CC66FF] cursor-pointer" />
                                    </span>
                                    <button onClick={() => handleDelete(task.id)} className="bg-[hsl(280,43%,39%)] px-6 py-2.5 rounded-md">Supprimer</button>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-4">Vous n&apos;avez pas encore de tâches créées.</li>
                        )}
                    </ul>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h2 className="text-[hsl(280,43%,39%)] text-lg font-semibold mb-4">Modifier la tâche</h2>
                        <input
                            type="text"
                            value={taskToEdit?.task ?? ""}
                            onChange={(e) => setTaskToEdit(prev => prev ? { ...prev, task: e.target.value } : null)}
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div className="flex justify-end mt-4">
                            <button onClick={handleUpdateTask} className="bg-[hsl(280,43%,39%)] text-white px-4 py-2 rounded-md mr-2">Enregistrer</button>
                            <button onClick={handleModalClose} className="bg-indigo-600 text-white px-4 py-2 rounded-md">Fermer</button>
                        </div>
                    </div>
                </div>
            )}




        </div>
    );
}