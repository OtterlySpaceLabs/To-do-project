"use client";
import { forwardRef, useImperativeHandle } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

const Confettis = forwardRef((props, ref) => {
  const { rive, RiveComponent } = useRive({
    src: "confetti.riv",
    animations: "Confetti 1",
    autoplay: false,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  useImperativeHandle(ref, () => ({
    playAnimation() {
      if (rive) {
        rive.play();
      }
    },
  }));

  function stopAnimation() {
    if (rive) {
      rive.pause();
    }
  }

  // if (rive) {
  //   console.log(rive);
  //   console.log(rive.contents);
  // }

  return (
    <div className="mt-4 flex h-[200px] w-[200px] flex-col items-center justify-between">
      <RiveComponent onClick={stopAnimation} />
    </div>
  );
});
Confettis.displayName = "Confettis";
export default Confettis;
