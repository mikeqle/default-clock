import React from "react";
import { AlertTriangle, DollarSign } from "lucide-react";

const Hero: React.FC = () => (
  <section className="text-center mb-8">
    <div className="flex items-center justify-center space-x-4 mb-4">
      <AlertTriangle className="h-10 w-10 text-red-500 animate-pulse" />
      <h1 className="text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-red-600 font-mono">
        US GOVERNMENT BANKRUPT CLOCK
      </h1>
      <DollarSign className="h-10 w-10 text-green-500 animate-pulse" />
    </div>
    <h2 className="text-xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 font-mono mb-2">
      BANKRUPTCY TRACKER
    </h2>
    <div className="mt-2 inline-block px-3 py-1 bg-red-900/30 border border-red-500/50 rounded-lg">
      <p className="text-red-300 font-mono text-xs lg:text-sm">
        ⚠️ PROJECTED BANKRUPTCY: JANUARY 1, 2062 ⚠️
      </p>
    </div>
  </section>
);

export default Hero; 