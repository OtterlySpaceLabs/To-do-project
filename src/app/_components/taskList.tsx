"use client";
import { useCallback, useState } from 'react'
import { type Task } from "~/server/db/schema";
import { api } from '~/trpc/react';
import TaskItem from './taskItem';
import update from 'immutability-helper';

interface TaskListProps {
    tasks?: Task[];
    openEditModal: (task: Task) => void;
    openDeleteModal: (task: Task) => void;
}

export default function TaskList({ tasks, openEditModal, openDeleteModal }: TaskListProps) {
    const [tasksAll, setTasksAll] = useState<Task[]>(tasks ?? []);
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

    const moveTask = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            setTasksAll((prevTasks: Task[]) =>
                update<Task[]>(prevTasks, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevTasks[dragIndex]!],
                    ],
                })
            );
        },
        []
    );

    const renderTask = useCallback(
        (task: Task, index: number) => {
            return (
                <TaskItem
                    key={task.id}
                    index={index}
                    task={task}
                    isCompleted={taskValided[task.id] ?? false}
                    onToggleComplete={handleCheckboxChange}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                    moveTask={moveTask}
                />
            )
        },
        [taskValided, handleCheckboxChange, openEditModal, openDeleteModal, moveTask],
    )

    return (
        <fieldset className="flex flex-col w-full mt-2 mt-6">
            <legend className="font-semibold text-xl">Liste des tâches</legend>
            <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                {
                    tasksAll && tasksAll.length > 0 ? (
                        tasksAll.map((task, index) => (
                            renderTask(task, index)

                        ))
                    ) : (
                        <div>Vous n&apos;avez pas encore de tâches créées</div>
                    )}
            </div>
        </fieldset>
    );
}