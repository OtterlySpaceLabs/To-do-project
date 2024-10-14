"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import animationData from "../../lotties/cat.json";

export default function Loader() {
  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <DotLottieReact
        data={animationData}
        style={{ width: 150, height: 150 }}
        speed={2.5}
        loop
        autoplay
      />
    </div>
  );
}
