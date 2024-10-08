"use client";

interface BackgroundCirclesProps {
  children: React.ReactNode;
  className?: string;
}

export default function BackgroundCircles({
  children,
  className,
}: BackgroundCirclesProps) {
  return (
    <div
      className={`relative h-screen w-full overflow-hidden bg-gradient-to-r from-primary to-primaryGradient ${className}`}
    >
      {/* Cercle 1 */}
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-secondary opacity-50 blur-3xl"></div>
      {/* Cercle 2 */}
      <div className="absolute right-1/4 top-1/4 h-48 w-48 rounded-full bg-primary opacity-50 blur-2xl"></div>
      {/* Cercle 3 */}
      <div className="absolute bottom-20 left-1/3 h-96 w-96 rounded-full bg-tertiary opacity-50 blur-3xl"></div>
      {/* Cercle 4 */}
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-accent opacity-50 blur-2xl"></div>
      {/* Contenu principal */}
      {children}
    </div>
  );
}
