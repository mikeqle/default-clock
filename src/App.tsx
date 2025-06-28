import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import DigitalCountdownTimer from "@/components/ui/CountdownClock";
import FinancialDashboard from "@/components/FinancialDashboard";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
          <Hero />
          <div className="mb-8">
            <DigitalCountdownTimer targetDate="2062-01-01T00:00:00" />
          </div>
          <div className="flex-1 mt-8">
            <FinancialDashboard />
          </div>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
