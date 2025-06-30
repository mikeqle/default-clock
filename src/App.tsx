import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import ConfigurationPanel from "@/components/ConfigurationPanel";
import DigitalCountdownTimer from "@/components/CountdownClock";
import ProjectionTableStandalone from "@/components/ProjectionTableStandalone";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { updateProjectionConfig } from "@/store/financialSlice";
import type { ProjectionConfig } from "@/components/ConfigurationPanel";
import "./App.css";

function App() {
  const handleConfigChange = (config: ProjectionConfig) => {
    store.dispatch(updateProjectionConfig(config));
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
          <Hero />
          <div className="mb-8">
            <DigitalCountdownTimer />
          </div>
          <div className="mb-8">
            <ConfigurationPanel onConfigChange={handleConfigChange} />
          </div>
          
          <div className="flex-1 mt-8 space-y-8">
            <ProjectionTableStandalone />
          </div>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
