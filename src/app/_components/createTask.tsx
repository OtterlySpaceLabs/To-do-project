"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { type Task } from "~/server/db/schema";
import { useTaskOperations } from "../hook/useTaskOperations";
import { useTaskMutations } from "../hook/useTaskMutations";

import Loader from "./loader";
import TaskForm from "./taskForm";
import TaskList from "./taskList";
import Modal from "./modal";

export default function CreateTask() {
    const [task, setTask] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    const { data, isLoading, error } = api.task.getAll.useQuery();
    const tasks = data ?? [];
    const utils = api.useUtils();

    const { createTask, deleteTaskMutation, updateTaskMutation } = useTaskMutations(utils, setTask);

    const {
        handleChange,
        handleSubmit,
        handleDelete,
        handleEditTask,
        handleUpdateTask,
        handleModalClose,
    } = useTaskOperations(setTask, setIsModalOpen, setTaskToEdit, createTask, deleteTaskMutation, updateTaskMutation, taskToEdit);

    return (
        <div>
            <TaskForm
                task={task}
                handleChange={handleChange}
                handleSubmit={(event) => handleSubmit(event, task)}
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
                        handleDelete={handleDelete}
                        handleEditTask={handleEditTask}
                    />
                )}
            </div>

            {isModalOpen && (
                <Modal
                    title="Modifier la tâche"
                    text="Vous pouvez modifier la tâche ci-dessous."
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    showIcon={false}
                    showText={false}
                    buttons={[
                        {
                            label: 'Annuler',
                            onClick: handleModalClose,
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
                        type="text"
                        value={taskToEdit?.task ?? ""}
                        onChange={(e) => setTaskToEdit(prev => prev ? { ...prev, task: e.target.value } : null)}
                        className="block w-full rounded-md border-0 mt-2 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </Modal>
            )}




        </div>
    );
}