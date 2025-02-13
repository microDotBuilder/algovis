import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { type Algorithm } from "../../Providers/AlgorithmContext";
import { GRAPH_ALGORITHMS } from "../../utils/consts";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

/** @deprecated Use NewAlgorithmSelector component instead */
export function AlgorithmSelector({
  setAlgo,
}: {
  setAlgo: (algo: Algorithm) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="bg-amber-700 font-mono flex gap-2 items-center text-white px-3 py-2 rounded-md hover:bg-amber-800 transition-all duration-200">
        select Algo
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(GRAPH_ALGORITHMS).map((al) => (
          <DropdownMenuItem
            key={al}
            onClick={() => setAlgo(al)}
            className="cursor-pointer uppercase"
          >
            {al}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
