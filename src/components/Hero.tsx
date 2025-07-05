import React from "react";
import { AlertTriangle, DollarSign } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="text-center">
      <div className="flex items-center justify-center space-x-4 mb-4">
        <AlertTriangle className="h-6 sm:h-10 w-6 sm:w-10 text-red-500 animate-pulse" />
        <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-red-600 font-mono">
          US GOVERNMENT DEFAULT CLOCK
        </h1>
        <DollarSign className="h-6 sm:h-10 w-6 sm:w-10 text-green-500 animate-pulse" />
      </div>
      <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 font-mono mb-2">
        BANKRUPTCY TRACKER
      </h2>
      <div className="max-w-2xl mx-auto text-green-200/90 font-mono text-xs sm:text-sm lg:text-sm space-y-2 px-2 sm:px-0">
        <p>
          The historical data is sourced from the U.S. Treasury and Federal
          Reserve Economic Data (FRED).
        </p>
        <p>
          The projection is based on three going-forward inputs: interest rate,
          receipts growth rate, and expenses (excluding interest) growth rate. The
          data is projected out to 2100. If we make it to 2100, I assume we'll be okay.
        </p>
      </div>
    </section>
  );
};

export default Hero;
