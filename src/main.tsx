import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { OnboardingProvider } from "./Providers/OnboardingContext";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OnboardingProvider>
      <App />
    </OnboardingProvider>
  </StrictMode>
);
