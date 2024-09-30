import Modal from "./modal";
import { type Task } from "~/server/db/schema";
import { api } from "~/trpc/react";

interface DeleteTaskModalProps {
    isOpen: boolean;
    taskToDelete: Task | null;
    onClose: () => void;
}

export default function DeleteTaskModal({ isOpen, taskToDelete, onClose }: DeleteTaskModalProps) {
    const utils = api.useUtils();
    // const deleteTaskMutation = api.task.delete.useMutation({
    //     onSuccess: async () => {
    //         await utils.task.getAll.invalidate();
    //     },
    // });

    const deleteTaskMutation = api.task.delete.useMutation({
        onSuccess: async (data, variables, context) => {
            console.log("Mutation delete réussie :", data);
            console.log("Variables delete :", variables);
            console.log("Contexte delete :", context);
            await utils.task.getAll.invalidate();
        },
        onError: (error, variables, context) => {
            console.error("Erreur de mutation :", error);
            console.log("Variables :", variables);
            console.log("Contexte :", context);
        },
    });

    const handleDeleteTask = () => {
        if (taskToDelete) {
            deleteTaskMutation.mutate({ id: taskToDelete.id });
            onClose();
        }
    };

    return (
        <Modal
            title="Supprimer la tâche"
            text="Voulez-vous supprimer la tâche définitivement?"
            isOpen={isOpen}
            onClose={onClose}
            showIcon={true}
            showText={true}
            buttons={[
                {
                    label: 'Annuler',
                    onClick: onClose,
                    className: 'bg-white rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                },
                {
                    label: 'Supprimer',
                    onClick: handleDeleteTask,
                    className: 'bg-warning rounded-md text-white hover:bg-warning'
                }
            ]}
        />
    );
};