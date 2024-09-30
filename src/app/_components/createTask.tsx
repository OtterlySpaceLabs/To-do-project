"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { type Task } from "~/server/db/schema";

import Loader from "./loader";
import TaskForm from "./taskForm";
import TaskList from "./taskList";
import EditTaskModal from "./editTaskModal";
import DeleteTaskModal from "./deleteTaskModal";
import { useTaskMutations } from "~/app/hook/useTaskMutations";

export default function CreateTask() {
    const [task, setTask] = useState("");
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

    const { data, isLoading, error } = api.task.getAll.useQuery();

    const tasks = data ?? [];

    console.log("Les tâches :", tasks);

    const utils = api.useUtils();

    const { createTask } = useTaskMutations(utils, setTask);

    // const createTask = api.task.create.useMutation({
    //     onSuccess: async () => {
    //         await utils.task.invalidate();
    //         setTask("");
    //     },
    // });

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (task.trim().length === 0) {
            console.error("Le champ de la tâche est vide.");
            return;
        }

        createTask.mutate({ name: task });
        console.log("Envoi de la mutation avec le nom :", task);
    };

    const openEditModal = (task: Task) => {
        setTaskToEdit(task);
        setIsModalEditOpen(true);
    };

    const closeEditModal = () => {
        setIsModalEditOpen(false);
        setTaskToEdit(null);
    };

    const openDeleteModal = (task: Task) => {
        setTaskToDelete(task);
        setIsModalDeleteOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalDeleteOpen(false);
        setTaskToDelete(null);
    };

    return (
        <div>
            <TaskForm
                task={task}
                setTask={setTask}
                handleSubmit={(event) => handleSubmit(event)}
            />
            <div className="flex flex-col items-center gap-2 mt-4">
                <h2 className="font-semibold text-xl">Liste des tâches</h2>
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <div className="text-red-500">Erreur lors du chargement des tâches : {error.message}</div>
                ) : (
                    <TaskList
                        tasks={tasks}
                        openEditModal={openEditModal}
                        openDeleteModal={openDeleteModal}
                    />
                )}
            </div>

            <EditTaskModal
                isOpen={isModalEditOpen}
                taskToEdit={taskToEdit}
                onClose={closeEditModal}
            />
            <DeleteTaskModal
                isOpen={isModalDeleteOpen}
                taskToDelete={taskToDelete}
                onClose={closeDeleteModal}
            />

        </div>
    );
}