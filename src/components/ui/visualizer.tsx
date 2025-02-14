import React, { useEffect, useRef } from "react";
import { initializeGrid } from "../../utils/grid";
import Node from "../../lib/node";
import { toast } from "react-toastify";
import { useAlgorithm } from "../../Providers/AlgorithmContext";
import { bfs } from "../../../backend/algorithms/bfs";
import { GRAPH_ALGORITHMS } from "../../utils/consts";
import { useGrid } from "../../Providers/GridContext";

const Visualizer: React.FC = () => {
  const {
    state,
    setGrid,
    setMousePressed,
    setSelectionMode,
    setStartNode,
    setEndNode,
    updateNode,
  } = useGrid();

  const { algorithm, isSolving, isPaused, stopSolving, isReset, setIsReset } =
    useAlgorithm();
  const isRunning = useRef(false);
  const pauseRef = useRef(false);
  const drawMode = useRef<boolean | null>(null);
  const animationState = useRef<{
    visitedIndex: number;
    pathIndex: number;
    visitedNodes: Node[];
    pathNodes: Node[];
  }>({
    visitedIndex: 0,
    pathIndex: 0,
    visitedNodes: [],
    pathNodes: [],
  });

  useEffect(() => {
    console.log("isReset", isReset);
    if (isReset) {
      const newGrid = initializeGrid();
      setGrid(newGrid);
      setSelectionMode("START");
      setIsReset(false);
    }
  }, [isReset]);

  useEffect(() => {
    pauseRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (!isSolving) {
      isRunning.current = false;
    }
    console.log("isSolving");
  }, [isSolving]);

  useEffect(() => {
    const newGrid = initializeGrid();
    setGrid(newGrid);
    setSelectionMode("START");

    console.log("newGrid");
  }, []);

  useEffect(() => {
    if (isSolving && algorithm === GRAPH_ALGORITHMS.BFS) {
      isRunning.current = true;
      pauseRef.current = false;
      handleVisualize();
    }
    console.log("isSolving, algorithm");
  }, [isSolving, algorithm]);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const waitForResume = async () => {
    while (pauseRef.current) {
      await sleep(100);
    }
  };

  const handleVisualize = async () => {
    if (!state.startNode || !state.endNode) {
      toast.error("Please select both start and end nodes first!");
      stopSolving();
      return;
    }

    const start = state.grid[state.startNode.row][state.startNode.col];
    const end = state.grid[state.endNode.row][state.endNode.col];

    const result = bfs(start, end);

    animationState.current = {
      visitedIndex: 0,
      pathIndex: 0,
      visitedNodes: result.visitedNodesInOrder,
      pathNodes: result.shortestPath,
    };

    await animateAlgorithm();
  };

  const animateAlgorithm = async () => {
    const { visitedNodes, pathNodes } = animationState.current;

    // Animate visited nodes
    while (
      animationState.current.visitedIndex < visitedNodes.length &&
      isRunning.current
    ) {
      if (pauseRef.current) {
        await waitForResume();
        if (!isRunning.current) break;
      }

      const node = visitedNodes[animationState.current.visitedIndex];
      if (!node.isStart && !node.isEnd) {
        await sleep(20);
        updateNode(node.getY(), node.getX(), { isVisited: true });
      }
      animationState.current.visitedIndex++;
    }

    // If path is empty but we've visited nodes, it means no path was found
    if (
      isRunning.current &&
      pathNodes.length === 0 &&
      visitedNodes.length > 0
    ) {
      toast.error("No path found to the target node!", {
        position: "top-center",
        autoClose: 5000,
      });

      // Optional: Animate visited nodes with a "failure" color
      for (const node of visitedNodes) {
        if (!node.isStart && !node.isEnd && !node.isWall) {
          await sleep(10);
          updateNode(node.getY(), node.getX(), { distance: 2 }); // Using distance 2 to show a different color
        }
      }
      stopSolving();
      return;
    }

    // If we have a path, animate it
    if (
      isRunning.current &&
      animationState.current.visitedIndex === visitedNodes.length
    ) {
      while (
        animationState.current.pathIndex < pathNodes.length &&
        isRunning.current
      ) {
        if (pauseRef.current) {
          await waitForResume();
          if (!isRunning.current) break;
        }

        const node = pathNodes[animationState.current.pathIndex];
        if (!node.isStart && !node.isEnd) {
          await sleep(50);
          updateNode(node.getY(), node.getX(), { distance: 1 });
        }
        animationState.current.pathIndex++;
      }
    }

    if (
      !isRunning.current ||
      (animationState.current.pathIndex === pathNodes.length &&
        animationState.current.visitedIndex === visitedNodes.length)
    ) {
      if (pathNodes.length > 0) {
        toast.success("Path found!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
      stopSolving();
    }
  };

  const handleNodeSelection = (row: number, col: number) => {
    if (state.grid[row][col].getIsStart() || state.grid[row][col].getIsEnd()) {
      return;
    }

    if (state.selectionMode === "START" && state.startNode) {
      updateNode(state.startNode.row, state.startNode.col, { isStart: false });
    } else if (state.selectionMode === "END" && state.endNode) {
      updateNode(state.endNode.row, state.endNode.col, { isEnd: false });
    }

    if (state.selectionMode === "START") {
      updateNode(row, col, { isStart: true });
      setStartNode({ row, col });
      setSelectionMode("END");
      toast.dismiss();
      toast.info("Now select an end node", {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      });
    } else if (state.selectionMode === "END") {
      updateNode(row, col, { isEnd: true });
      setEndNode({ row, col });
      setSelectionMode("WALL");
      toast.dismiss();
      toast.success(
        "You can now draw walls by clicking or dragging on the grid!",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    } else if (state.selectionMode === "WALL") {
      drawMode.current = !state.grid[row][col].getIsWall();
      updateNode(row, col, { isWall: drawMode.current });
    }
  };

  const handleMouseDown = (row: number, col: number) => {
    setMousePressed(true);
    handleNodeSelection(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (
      state.isMousePressed &&
      state.selectionMode === "WALL" &&
      drawMode.current !== null
    ) {
      if (
        !state.grid[row][col].getIsStart() &&
        !state.grid[row][col].getIsEnd()
      ) {
        updateNode(row, col, { isWall: drawMode.current });
      }
    }
  };

  const handleMouseUp = () => {
    setMousePressed(false);
    drawMode.current = null;
  };

  return (
    <div
      className="grid grid-cols-[repeat(50,1fr)] gap-0 p-4 bg-white rounded-lg shadow-lg"
      onMouseLeave={() => {
        setMousePressed(false);
        drawMode.current = null;
      }}
    >
      {state.grid.map((row, rowIdx) =>
        row.map((node, colIdx) => (
          <div
            key={`${rowIdx}-${colIdx}`}
            className={`
              w-6 h-6 border border-gray-200
              ${node.getIsStart() ? "bg-green-500" : ""}
              ${node.getIsEnd() ? "bg-red-500" : ""}
              ${node.getIsWall() ? "bg-gray-800" : ""}
              ${
                node.getIsVisited() && !node.getIsStart() && !node.getIsEnd()
                  ? "bg-blue-200"
                  : ""
              }
              ${
                node.getDistance() === 1 &&
                !node.getIsStart() &&
                !node.getIsEnd()
                  ? "bg-yellow-400"
                  : ""
              }
              ${
                node.getDistance() === 2 &&
                !node.getIsStart() &&
                !node.getIsEnd()
                  ? "bg-red-200"
                  : ""
              }
              transition-colors duration-300
              cursor-pointer
              select-none
            `}
            onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
            onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
            onMouseUp={handleMouseUp}
          />
        ))
      )}
    </div>
  );
};

export default Visualizer;
