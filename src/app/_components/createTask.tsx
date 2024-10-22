"use client";

import { useEffect, useState, useRef } from "react";
import { api } from "~/trpc/react";
import { type Task } from "~/server/db/schema";

import Loader from "./loader";
import TaskForm from "./taskForm";
import TaskList from "./taskList";
import EditTaskModal from "./editTaskModal";
import DeleteTaskModal from "./deleteTaskModal";
import Confettis from "./confettis";
import { useTaskMutations } from "~/app/hook/useTaskMutations";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
interface ConfettiRef {
  playAnimation: () => void;
}

export default function CreateTask() {
  const [task, setTask] = useState("");
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const { data: tasks, isLoading, error } = api.task.getAll.useQuery();

  useEffect(() => {
    console.log("Les tâches :", tasks);
  }, [tasks]);

  const [showLoader, setShowLoader] = useState(true);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!isLoading) {
      const elapsedTime = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(2000 - elapsedTime, 0);

      const timer = setTimeout(() => {
        setShowLoader(false);
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const utils = api.useUtils();

  const { createTask } = useTaskMutations(utils, setTask);

  const confettiRef = useRef<ConfettiRef>(null);

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (task.trim().length === 0) {
      console.error("Le champ de la tâche est vide.");
      return;
    }

    createTask.mutate({ name: task });
    console.log("Envoi de la mutation avec le nom :", task);

    if (confettiRef.current) {
      confettiRef.current.playAnimation();
    }
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsModalEditOpen(true);
  };

  const closeEditModal = () => {
    setIsModalEditOpen(false);
    setTaskToEdit(null);
  };

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setIsModalDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalDeleteOpen(false);
    setTaskToDelete(null);
  };

  return (
    <div>
      <div className="mt-6 flex items-center gap-4">
        <TaskForm
          task={task}
          setTask={setTask}
          handleSubmit={(event) => handleSubmit(event)}
        />
        <Confettis ref={confettiRef} />
      </div>
      <div className="mt-6 flex flex-col items-center gap-2">
        {showLoader ? (
          <Loader />
        ) : error ? (
          <div className="text-warning">
            Erreur lors du chargement des tâches : {error.message}
          </div>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <TaskList
              tasks={tasks}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          </DndProvider>
        )}
      </div>

      <EditTaskModal
        isOpen={isModalEditOpen}
        taskToEdit={taskToEdit}
        onClose={closeEditModal}
      />
      <DeleteTaskModal
        isOpen={isModalDeleteOpen}
        taskToDelete={taskToDelete}
        onClose={closeDeleteModal}
      />
    </div>
  );
}
