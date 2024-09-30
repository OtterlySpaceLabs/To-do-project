import { useState, useEffect } from "react";
import Modal from "./modal";
import { type Task } from "~/server/db/schema";
import { api } from "~/trpc/react";

interface EditTaskModalProps {
    isOpen: boolean;
    taskToEdit: Task | null;
    onClose: () => void;
}

export default function EditTaskModal({ isOpen, taskToEdit, onClose }: EditTaskModalProps) {
    const [editTaskName, setEditTaskName] = useState(taskToEdit?.task ?? "");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (taskToEdit) {
            setEditTaskName(taskToEdit.task);
        }
    }, [taskToEdit]);

    const utils = api.useUtils();
    // const updateTaskMutation = api.task.update.useMutation({
    //     onSuccess: async () => {
    //         await utils.task.getAll.invalidate();
    //     },
    // });

    const updateTaskMutation = api.task.update.useMutation({
        onSuccess: async (data, variables, context) => {
            console.log("Mutation update réussie :", data);
            console.log("Variables update :", variables);
            console.log("Contexte update :", context);
            await utils.task.getAll.invalidate();
        },
        onError: (error, variables, context) => {
            console.error("Erreur de mutation :", error);
            console.log("Variables :", variables);
            console.log("Contexte :", context);
        },
    });

    const handleUpdateTask = () => {
        if (editTaskName.trim().length === 0) {
            setErrorMessage("Le champ de la tâche ne peut pas être vide.");
            return;
        }
        if (taskToEdit) {
            setErrorMessage("");
            updateTaskMutation.mutate({ id: taskToEdit?.id ?? 0, name: editTaskName ?? "" });
            console.log("La mutation a été envoyée avec updatemutation :", updateTaskMutation);
            onClose();
        }
    };

    return (
        <Modal
            title="Modifier la tâche"
            text="Vous pouvez modifier la tâche ci-dessous."
            isOpen={isOpen}
            onClose={onClose}
            showIcon={false}
            showText={false}
            buttons={[
                {
                    label: 'Annuler',
                    onClick: onClose,
                    className: 'bg-white rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                },
                {
                    label: 'Modifier',
                    onClick: handleUpdateTask,
                    className: 'bg-fuchsia-900 rounded-md text-white hover:bg-fuchsia-700'
                }
            ]}
        >
            <input
                id="edit-task"
                name="edit-task"
                type="text"
                value={editTaskName}
                onChange={(e) => setEditTaskName(e.target.value)}
                className="block w-full rounded-md border-0 mt-2 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        </Modal>
    );
};