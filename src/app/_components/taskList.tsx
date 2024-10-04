"use client";
import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import { type Task } from "~/server/db/schema";
import { api } from '~/trpc/react';

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
                            <div key={task.id} className="relative flex items-center py-4">
                                <div className="ml-3 mr-3 flex items-center">
                                    <input
                                        id={`task-${task.id}`}
                                        name={`task-${task.id}`}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        onChange={() => handleCheckboxChange(task.id, taskValided[task.id] ?? false)}
                                        checked={taskValided[task.id] ?? false}
                                    />
                                </div>
                                <div className="min-w-0 flex-1 text-sm leading-6">
                                    <label htmlFor={`task-${task.id}`} className="select-none font-medium text-gray-900">
                                        {task.task}
                                    </label>
                                </div>
                                <div>
                                    {taskValided[task.id] && <p className="text-sm self-start">Validée</p>}
                                </div>
                                <div className="ml-3 mr-3 gap-2 flex items-center">
                                    <span
                                        onClick={() => openEditModal(task)}
                                        className="inline-block p-1.5 rounded-full shadow-md bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-accentGradient hover:animate-bigger cursor-pointer"
                                    >
                                        <PencilIcon className="h-5 w-5 text-white" />
                                    </span>
                                    <span
                                        onClick={() => openDeleteModal(task)}
                                        className="inline-block p-1.5 rounded-full shadow-md bg-gradient-to-r from-warning to-warningGradient hover:from-warningGradient hover:to-warningGradient hover:animate-bigger cursor-pointer"
                                    >
                                        <TrashIcon className="h-5 w-5 text-white" />
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Vous n&apos;avez pas encore de tâches créées</div>
                    )}
            </div>
        </fieldset>
    );
}