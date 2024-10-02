"use client";

interface BackgroundCirclesProps {
    children: React.ReactNode;
    className?: string;
}

export default function BackgroundCircles({ children, className }: BackgroundCirclesProps) {
    return (
        <div className={`relative bg-gradient-to-r from-primary to-primaryGradient w-full h-screen overflow-hidden ${className}`}>
            {/* Cercle 1 */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl opacity-50"></div>
            {/* Cercle 2 */}
            <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-primary rounded-full blur-2xl opacity-50"></div>
            {/* Cercle 3 */}
            <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-tertiary rounded-full blur-3xl opacity-50"></div>
            {/* Cercle 4 */}
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent rounded-full blur-2xl opacity-50"></div>
            {/* Contenu principal */}
            {children}
        </div>
    );
};
