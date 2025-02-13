import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { GRAPH_ALGORITHMS } from "../../../utils/consts";
import { type Algorithm } from "../../../Providers/AlgorithmContext";
import { useState } from "react";

export function NewAlgorithmSelector({
  setAlgo,
}: {
  setAlgo: (algo: Algorithm) => void;
}) {
  const [value, setValue] = useState<Algorithm>("");

  return (
    <>
      <Select
        value={value}
        onValueChange={(newValue: Algorithm) => {
          setValue(newValue);
          setAlgo(newValue);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Algorithm" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(GRAPH_ALGORITHMS).map((algo: Algorithm) => (
            <SelectItem
              key={algo}
              value={algo}
              className="cursor-pointer uppercase"
            >
              {algo}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
