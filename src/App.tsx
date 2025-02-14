import "./App.css";
import NewHeader from "./components/header/header2";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";
import { AlgorithmProvider } from "./Providers/AlgorithmContext";
import {
  OnboardingProvider,
  useOnboarding,
} from "./Providers/OnboardingContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WelcomeDialog } from "./lib/welcome-dialog";
import { GridProvider } from "./Providers/GridContext";

function App() {
  return (
    <OnboardingProvider>
      <AppContent />
    </OnboardingProvider>
  );
}

function AppContent() {
  const { showOnboarding, currentStep, setCurrentStep, completeOnboarding } =
    useOnboarding();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-zinc-50 to-white">
      {showOnboarding && currentStep === 0 && (
        <WelcomeDialog
          showOnboarding={showOnboarding}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          completeOnboarding={completeOnboarding}
        />
      )}
      <GridProvider>
        <AlgorithmProvider>
          <NewHeader />
          <Main />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </AlgorithmProvider>
      </GridProvider>
      <div className="mt-auto flex justify-center">
        <Footer />
      </div>
    </div>
  );
}

export default App;
