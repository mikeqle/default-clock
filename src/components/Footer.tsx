import React from "react";

const Footer: React.FC = () => (
  <footer className="mt-8 text-center">
    <div className="inline-block px-6 py-3 bg-gray-900/50 border border-green-500/30 rounded-lg backdrop-blur-sm">
      <p className="text-green-300/60 font-mono text-xs">
        Data includes quarterly collections, operational expenses, interest payments, and debt metrics
      </p>
      <p className="text-green-300/40 font-mono text-xs mt-1">
        Projection based on current trends in deficit spending and compound interest
      </p>
      <div className="mt-3 pt-2 border-t border-green-500/20">
        <p className="text-green-300/60 font-mono text-xs">
          Made by {" "}
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
  </footer>
);

export default Footer; 