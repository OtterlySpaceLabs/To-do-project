"use client";
import Confettis from "./confettis";
interface TaskFormProps {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export default function TaskForm({
  task,
  setTask,
  handleSubmit,
}: TaskFormProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  return (
    <form className="mb-6 mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <div className="sm:w-50 inline-flex w-full items-center justify-center">
        <label htmlFor="task" className="sr-only">
          Tâche
        </label>
        <input
          id="task"
          name="task"
          type="text"
          placeholder="Créer une nouvelle tâche"
          className="block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          value={task}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className={`inline-flex w-full items-center justify-center rounded-md px-3 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-0 sm:w-auto ${task.trim().length === 0
          ? "cursor-not-allowed bg-gray-400 text-gray-900"
          : "bg-gradient-to-r from-primary to-accent text-white hover:from-accent hover:to-accentGradient hover:shadow-lg focus-visible:outline-primary"
          }`}
        onClick={handleSubmit}
        disabled={task.trim().length === 0}
      >
        Ajouter
      </button>
      <Confettis />
    </form>
  );
}
