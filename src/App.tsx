import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfigurationPanel from "@/components/ConfigurationPanel";
import DigitalCountdownTimer from "@/components/CountdownClock";
import FinancialDashboard from "@/components/FinancialDashboard";
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
            <Tabs defaultValue="projection" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-cyan-500/30">
                <TabsTrigger 
                  value="projection" 
                  className="font-mono text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  📊 PROJECTION TABLE
                </TabsTrigger>
                <TabsTrigger 
                  value="dashboard" 
                  className="font-mono text-sm data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
                >
                  📈 FINANCIAL DASHBOARD
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="projection" className="mt-6">
                <ProjectionTableStandalone />
              </TabsContent>
              
              <TabsContent value="dashboard" className="mt-6">
                <FinancialDashboard />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
