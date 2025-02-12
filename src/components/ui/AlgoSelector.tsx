import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { type Algorithm } from "../../Providers/AlgorithmContext";
import { GRAPH_ALGORITHMS } from "../../utils/consts";
export function AlgorithmSelector({
  setAlgo,
}: {
  setAlgo: (algo: Algorithm) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-blue-500 text-white px-4 py-2 rounded-md">
        select Algo
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setAlgo(GRAPH_ALGORITHMS.BFS)}>
          BFS
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAlgo(GRAPH_ALGORITHMS.DFS)}>
          DFS
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAlgo(GRAPH_ALGORITHMS.DIJKSTRA)}>
          Dijkstra
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAlgo(GRAPH_ALGORITHMS.PRIM)}>
          Prim
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
