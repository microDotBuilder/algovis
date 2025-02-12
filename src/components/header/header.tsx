import { Button } from "../../components/ui/button";
import { AlgorithmSelector } from "../ui/AlgoSelector";
import { useAlgorithm } from "../../Providers/AlgorithmContext";

export default function Header() {
  const { algorithm, setAlgorithm, startSolving, stopSolving } = useAlgorithm();

  const handleSolveClick = () => {
    if (algorithm) {
      startSolving();
    } else {
      alert("Please select an algorithm first");
    }
  };

  return (
    <header className="bg-gray-200 p-4 flex justify-between items-center">
      <h1>Hello World</h1>
      <nav>
        <ul className="flex gap-4">
          <AlgorithmSelector setAlgo={setAlgorithm} />
          <Button variant="destructive" onClick={handleSolveClick}>
            Solve
          </Button>
          <Button variant="secondary" onClick={stopSolving}>
            Stop
          </Button>
        </ul>
      </nav>
    </header>
  );
}
