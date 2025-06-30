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
        <div className="flex-1 container mx-auto px-4 py-8 flex flex-col space-y-8">
          <Hero />
          <DigitalCountdownTimer />
          <ConfigurationPanel onConfigChange={handleConfigChange} />
          <ProjectionTableStandalone />
          
          {/* Google Sheets Reference Section */}
          <div className="text-center">
            <div className="inline-block px-8 py-6 bg-gray-900/60 border-2 border-cyan-500/40 rounded-lg backdrop-blur-sm shadow-lg max-w-2xl">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                <h3 className="text-cyan-400 font-mono text-lg font-bold uppercase tracking-wider">
                  📊 ADVANCED MODEL AVAILABLE
                </h3>
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <p className="text-cyan-200 font-mono text-sm">
                  This projection is a simplified version of the more flexible financial model available in
                </p>
                <a
                  href="https://docs.google.com/spreadsheets/d/1ihLvl025R4tPf7_nbu9-FmwvSI8B3luy3GDhwcZXAUQ/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-500 rounded-md font-mono text-sm font-bold transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  <span>🔗 GOOGLE SHEETS</span>
                </a>
                <p className="text-cyan-300/80 font-mono text-xs">
                  Feel free to make a copy and experiment with different scenarios
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
