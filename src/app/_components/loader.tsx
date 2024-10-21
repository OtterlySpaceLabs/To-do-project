"use client";

export default function Loader() {
  return (
    <div className="mt-4 flex h-[300px] w-[300px] flex-col items-center gap-2">
      <p>On attend parce que c&#39;est le loader</p>
    </div>
  );
}

// "use client";

// import { useRive } from "@rive-app/react-canvas";

// export const UrlDemo = () => {
//   const { rive, RiveComponent } = useRive({
//     src: "https://cdn.rive.app/animations/vehicles.riv",
//     autoplay: true,
//   });
//   return <RiveComponent />;
// };

// export default function Loader() {
//   return (
//     <div className="RiveContainer">
//       <UrlDemo />
//     </div>
//   );
// }

