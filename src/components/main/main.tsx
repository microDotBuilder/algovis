import { useAlgorithm } from "../../Providers/AlgorithmContext";

import Visualizer from "../ui/visualizer";
export default function Main() {
  const { algorithm, isSolving } = useAlgorithm();

  return (
    <main className="flex-1 bg-gray-300 p-4">
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex">
          {algorithm && isSolving && (
            <p className="text-2xl font-mono"> Running {algorithm}</p>
          )}
        </div>
      </div>
      {isSolving && <p>Solving in progress...</p>}
      <Visualizer />
    </main>
  );
}
