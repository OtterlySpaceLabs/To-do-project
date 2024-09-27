import { type Task } from "~/server/db/schema";
import type { api } from "~/trpc/react";

export const useTaskOperations = (
    setTask: React.Dispatch<React.SetStateAction<string>>,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setTaskToEdit: React.Dispatch<React.SetStateAction<Task | null>>,
    createTask: ReturnType<typeof api.task.create.useMutation>,
    deleteTaskMutation: ReturnType<typeof api.task.delete.useMutation>,
    updateTaskMutation: ReturnType<typeof api.task.update.useMutation>,
    taskToEdit: Task | null
) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>, task: string) => {
        event.preventDefault();
        if (task.trim().length === 0) {
            console.error("Le champ de la tâche est vide.");
            return;
        }

        createTask.mutate({ name: task });
        console.log("Envoi de la mutation avec le nom :", task);
    };

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

    return {
        handleChange,
        handleSubmit,
        handleDelete,
        handleEditTask,
        handleUpdateTask,
        handleModalClose,
    };
};