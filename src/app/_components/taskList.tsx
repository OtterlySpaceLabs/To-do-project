"use client";
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import { type Task } from "~/server/db/schema";

interface TaskListProps {
    tasks: Task[];
    openEditModal: (task: Task) => void;
    openDeleteModal: (task: Task) => void;
}

export default function TaskList({ tasks, openEditModal, openDeleteModal }: TaskListProps) {
    return (
        <fieldset className="flex flex-col w-full mt-2 mt-6">
            <legend className="font-semibold text-xl">Liste des tâches</legend>
            <div className="mt-4">
                {
                    tasks.length > 0 ? (
                        tasks.map((task) => (
                            <div key={task.id} className="relative flex items-center py-4">
                                <div className="ml-3 mr-3 flex items-center">
                                    <input
                                        id={`task-${task.id}`}
                                        name={`task-${task.id}`}
                                        type="checkbox"
                                        className="h-4 w-4 rounded-md border-gray-300 text-secondary focus:ring-secondary focus:ring-2 focus:ring-offset-2 focus: rounded-md"
                                    />
                                </div>
                                <div className="min-w-0 flex-1 text-sm leading-6">
                                    <label htmlFor={`task-${task.id}`} className="select-none font-medium text-gray-900">
                                        {task.task}
                                    </label>

                                </div>
                                <div className="ml-3 mr-3 gap-2 flex items-center">
                                    <span onClick={() => openEditModal(task)}>
                                        <PencilIcon className="h-5 w-5 text-primary cursor-pointer" />
                                    </span>
                                    <span onClick={() => openDeleteModal(task)}>
                                        <TrashIcon className="h-5 w-5 text-warning cursor-pointer" />
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