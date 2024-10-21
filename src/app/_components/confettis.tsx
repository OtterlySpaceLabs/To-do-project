"use client";
import Rive from "@rive-app/react-canvas";

export default function Confettis() {
  return (
    <div className="mt-4 flex h-[300px] w-[300px] flex-col items-center gap-2">
      <Rive src="confetti.riv" />
    </div>
  );
}
