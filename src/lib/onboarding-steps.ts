import { OnboardingStep } from "@/types/types";

export const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to Algorithm Visualizer!",
    description:
      "Let's take a quick tour to help you get started. You can skip this tutorial at any time.",
    target: ".algorithm-select",
    placement: "bottom",
  },
  {
    title: "Choose an Algorithm",
    description:
      "Start by selecting an algorithm from the dropdown. We have pathfinding and sorting algorithms available.",
    target: ".algorithm-select",
    placement: "bottom",
  },
  {
    title: "Draw Walls",
    description:
      "Click and drag on the grid to draw walls. For pathfinding algorithms, these walls will be obstacles.",
    target: ".visualization-grid",
    placement: "top",
  },
  {
    title: "Visualize",
    description:
      "Click 'Solve' to watch the algorithm in action. You can reset the grid at any time.",
    target: ".action-buttons",
    placement: "bottom",
  },
];
