"use client";
import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import { type Task } from "~/server/db/schema";
import { api } from '~/trpc/react';
import TaskItem from './taskItem';

interface TaskListProps {
    tasks?: Task[];
    openEditModal: (task: Task) => void;
    openDeleteModal: (task: Task) => void;
}

export default function TaskList({ tasks, openEditModal, openDeleteModal }: TaskListProps) {
    const [taskValided, setTaskValided] = useState<Record<string, boolean>>(tasks?.reduce((state, task) => ({ ...state, [task.id]: !!task.completedAt }), {}) ?? {});

    const toggleCompleteMutation = api.task.toggleComplete.useMutation();

    const handleCheckboxChange = (taskId: number, currentValue: boolean) => {
        setTaskValided((prevState) => ({
            ...prevState,
            [taskId]: !currentValue,
        }));

        toggleCompleteMutation.mutate({
            id: taskId,
            completed: !currentValue,
        });
    };

    return (
        <fieldset className="flex flex-col w-full mt-2 mt-6">
            <legend className="font-semibold text-xl">Liste des tâches</legend>
            <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                {
                    tasks && tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                isCompleted={taskValided[task.id] ?? false}
                                onToggleComplete={handleCheckboxChange}
                                onEdit={openEditModal}
                                onDelete={openDeleteModal}
                            />
                        ))
                    ) : (
                        <div>Vous n&apos;avez pas encore de tâches créées</div>
                    )}
            </div>
        </fieldset>
    );
}