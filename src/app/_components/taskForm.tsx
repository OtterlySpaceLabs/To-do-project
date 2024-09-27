"use client";

interface TaskFormProps {
    task: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export default function TaskForm({ task, handleChange, handleSubmit }: TaskFormProps) {

    return (
        <form className="flex flex-col gap-3 mt-2 justify-center items-center sm:flex-row">
            <div className="w-full inline-flex items-center justify-center sm:w-50">
                <label htmlFor="task" className="sr-only">
                    Tâche
                </label>
                <input
                    id="task"
                    name="task"
                    type="text"
                    placeholder="Créer une nouvelle tâche"
                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={task}
                    onChange={handleChange}
                />
            </div>
            <button
                type="submit"
                className={`w-full inline-flex items-center justify-center rounded-md px-3 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-0 sm:w-auto ${task.trim().length === 0
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    }`} onClick={handleSubmit}
                disabled={task.trim().length === 0}
            >
                Ajouter
            </button>
        </form>
    );
}