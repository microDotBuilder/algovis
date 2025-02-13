import "./App.css";
import NewHeader from "./components/header/header2";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";
import { AlgorithmProvider } from "./Providers/AlgorithmContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WelcomeDialog } from "./lib/welcome-dialog";
import { useState } from "react";

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const completeOnboarding = () => {
    setShowOnboarding(false);
  };
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-50 to-white">
      <WelcomeDialog
        showOnboarding={showOnboarding}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        completeOnboarding={completeOnboarding}
      />
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
      <Footer />
    </div>
  );
}

export default App;
