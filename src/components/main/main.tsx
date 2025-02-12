import { useAlgorithm } from "../../Providers/AlgorithmContext";
import { useEffect } from "react";
import Visualizer from "../ui/visualizer";
export default function Main() {
  const { algorithm, isSolving, stopSolving } = useAlgorithm();

  useEffect(() => {
    if (isSolving) {
      // Here you can implement your algorithm visualization logic
      console.log(`Starting ${algorithm} visualization`);

      // For demonstration, we'll stop after 2 seconds
      const timer = setTimeout(() => {
        stopSolving();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSolving, algorithm, stopSolving]);

  return (
    <main className="flex-1 bg-gray-300 p-4">
      <h2>Main Content</h2>
      <p>{algorithm}</p>
      {isSolving && <p>Solving in progress...</p>}
      <Visualizer />
    </main>
  );
}
