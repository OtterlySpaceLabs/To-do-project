"use client";

interface TaskFormProps {
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export default function TaskForm({ task, setTask, handleSubmit }: TaskFormProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    };

    return (
        <form className="flex flex-col gap-4 mt-2 mb-6 justify-center items-center sm:flex-row">
            <div className="w-full inline-flex items-center justify-center sm:w-50">
                <label htmlFor="task" className="sr-only">
                    Tâche
                </label>
                <input
                    id="task"
                    name="task"
                    type="text"
                    placeholder="Créer une nouvelle tâche"
                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    value={task}
                    onChange={handleChange}
                />
            </div>
            <button
                type="submit"
                className={`w-full inline-flex items-center justify-center rounded-md px-3 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-0 sm:w-auto ${task.trim().length === 0
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-accent text-white focus-visible:outline-primary hover:shadow-lg hover:from-accent hover:to-accentGradient"
                    }`} onClick={handleSubmit}
                disabled={task.trim().length === 0}
            >
                Ajouter
            </button>
        </form>
    );
}