import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import DigitalCountdownTimer from "@/components/ui/CountdownClock";
import FinancialDashboard from "@/components/FinancialDashboard";
import { AlertTriangle, DollarSign } from "lucide-react";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-cyan-400/10 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <AlertTriangle className="h-12 w-12 text-red-500 animate-pulse" />
              <h1 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-red-600 font-mono">
                US GOVERNMENT
              </h1>
              <DollarSign className="h-12 w-12 text-green-500 animate-pulse" />
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 font-mono mb-2">
              BANKRUPTCY TRACKER
            </h2>
            <p className="text-green-300/80 font-mono text-sm lg:text-base max-w-2xl mx-auto">
              Real-time financial monitoring and countdown to projected
              insolvency event
            </p>
            <div className="mt-4 inline-block px-4 py-2 bg-red-900/30 border border-red-500/50 rounded-lg">
              <p className="text-red-300 font-mono text-xs lg:text-sm">
                ⚠️ PROJECTED BANKRUPTCY: JANUARY 1, 2062 ⚠️
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <DigitalCountdownTimer targetDate="2062-01-01T00:00:00" />
          </div>

          {/* Financial Dashboard */}
          <div className="mt-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-green-400 font-mono mb-2">
                FINANCIAL METRICS DASHBOARD
              </h3>
              <p className="text-green-300/60 font-mono text-sm">
                Historical data and key indicators driving the bankruptcy
                projection
              </p>
            </div>
            <FinancialDashboard />
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="inline-block px-6 py-3 bg-gray-900/50 border border-green-500/30 rounded-lg backdrop-blur-sm">
              <p className="text-green-300/60 font-mono text-xs">
                Data includes quarterly collections, operational expenses,
                interest payments, and debt metrics
              </p>
              <p className="text-green-300/40 font-mono text-xs mt-1">
                Projection based on current trends in deficit spending and
                compound interest
              </p>
              <div className="mt-3 pt-2 border-t border-green-500/20">
                <p className="text-green-300/60 font-mono text-xs">
                  Made by{" "}
                  <a
                    href="https://x.com/mikedle_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors duration-200 underline decoration-green-500/50 hover:decoration-green-400"
                  >
                    @mikedle_
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Glowing border effect */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-3xl border-2 border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.1)]" />
        </div>
      </div>
    </Provider>
  );
}

export default App;
