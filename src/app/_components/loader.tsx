"use client";

export default function Loader() {
    return (
        <div className="flex flex-col items-center gap-2 mt-4">
            <svg className="animate-spin h-24 w-24 mr-3 stroke-accent" viewBox="0 0 24 24">
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    className="opacity-50"
                />
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="31.4"
                    strokeDashoffset="31.4"
                    strokeLinecap="round"
                    className="animate-spin-fast"
                />
            </svg>
            Chargement des tâches...
        </div>
    )
};

