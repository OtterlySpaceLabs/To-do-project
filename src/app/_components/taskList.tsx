"use client";

import { PencilIcon } from '@heroicons/react/24/outline';
import { type Task } from "~/server/db/schema";

interface TaskListProps {
    tasks: Task[];
    handleEditTask: (task: Task) => void;
    handleDelete: (id: number) => void;
}

export default function TaskList({ tasks, handleDelete, handleEditTask }: TaskListProps) {
    return (
        <ul role="list" className="space-y-3">
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <li key={task.id} className="flex justify-between items-center gap-5 mt-4">
                        <span className="overflow-hidden text-fuchsia-900 bg-white px-6 py-3 shadow rounded-md mr-4">{task.task}</span>
                        <span onClick={() => handleEditTask(task)}>
                            <PencilIcon className="h-6 w-6 text-fuchsia-400 cursor-pointer" />
                        </span>
                        <button onClick={() => handleDelete(task.id)} className="bg-fuchsia-900 px-6 py-2.5 rounded-md">Supprimer</button>
                    </li>
                ))
            ) : (
                <li className="px-4 py-4">Vous n&apos;avez pas encore de tâches créées.</li>
            )}
        </ul>
    );
}