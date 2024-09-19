"use client";

import { useState, useEffect } from "react";

export default function CreateTask() {

    const [task, setTask] = useState("");
    console.log("Task", task);
    console.log("Task", setTask);

    const handleChange = (event) => {
        setTask(event.target.value);
        console.log("Task updated:", event.target.value);
    }

    return (
        <div>
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
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0 sm:w-auto"
                >
                    Ajouter
                </button>
            </form>
        </div>
    );
}