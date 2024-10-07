"use client";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { type Task } from "~/server/db/schema";

interface TaskProps {
    task: Task;
    isCompleted: boolean;
    onToggleComplete: (taskId: number, currentValue: boolean) => void;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

export default function TaskItem({
    task,
    isCompleted,
    onToggleComplete,
    onEdit,
    onDelete,
}: TaskProps) {
    return (
        <div key={task.id} className="relative flex items-center py-4">
            <div className="ml-3 mr-3 flex items-center">
                <input
                    id={`task-${task.id}`}
                    name={`task-${task.id}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    onChange={() => onToggleComplete(task.id, isCompleted)}
                    checked={isCompleted}
                />
            </div>
            <div className="min-w-0 flex-1 text-sm leading-6">
                <label
                    htmlFor={`task-${task.id}`}
                    className="select-none font-medium text-gray-900"
                >
                    {task.task}
                </label>
            </div>
            <div>
                {isCompleted && <p className="text-sm self-start">Validée</p>}
            </div>
            <div className="ml-3 mr-3 gap-2 flex items-center">
                <span
                    onClick={() => onEdit(task)}
                    className="inline-block p-1.5 rounded-full shadow-md bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-accentGradient hover:animate-bigger cursor-pointer"
                >
                    <PencilIcon className="h-5 w-5 text-white" />
                </span>
                <span
                    onClick={() => onDelete(task)}
                    className="inline-block p-1.5 rounded-full shadow-md bg-gradient-to-r from-warning to-warningGradient hover:from-warningGradient hover:to-warningGradient hover:animate-bigger cursor-pointer"
                >
                    <TrashIcon className="h-5 w-5 text-white" />
                </span>
            </div>
        </div>
    );
}


