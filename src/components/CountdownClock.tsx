"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { calculateProjectionData } from "@/utils/finance";

interface FlipDigitProps {
  value: number;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ value }) => {
  
  const [displayValue, setDisplayValue] = useState(value);
  const [nextValue, setNextValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setNextValue(value);
      setIsAnimating(true);

      setTimeout(() => {
        setDisplayValue(value);
        setTimeout(() => setIsAnimating(false), 150);
      }, 150);
    }
  }, [value, displayValue]);

  return (
    <div
      className="relative inline-block overflow-hidden bg-black border-2 border-green-600 rounded-lg shadow-2xl shadow-green-500/20"
      style={{ width: "3rem", height: "4rem" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-black to-gray-900 opacity-90" />

      <div
        className={`absolute inset-0 flex items-center justify-center text-green-400 font-mono font-black text-2xl transition-transform duration-200 ease-out drop-shadow-lg ${
          isAnimating ? "transform -translate-y-full opacity-0" : ""
        }`}
        style={{
          textShadow:
            "0 0 10px rgba(34, 197, 94, 0.8), 0 0 20px rgba(34, 197, 94, 0.4)",
          transitionDuration: "150ms",
        }}
      >
        {displayValue}
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center text-green-400 font-mono font-black text-2xl transition-transform duration-200 ease-out drop-shadow-lg transform translate-y-full opacity-0 ${
          isAnimating ? "transform translate-y-0 opacity-100" : ""
        }`}
        style={{
          textShadow:
            "0 0 10px rgba(34, 197, 94, 0.8), 0 0 20px rgba(34, 197, 94, 0.4)",
          transitionDuration: "150ms",
          transitionDelay: "75ms",
        }}
      >
        {nextValue}
      </div>

      {isAnimating && (
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"
          style={{
            top: "50%",
            boxShadow: "0 0 4px rgba(34, 197, 94, 0.8)",
          }}
        />
      )}

      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1 left-1 right-1 h-px bg-gradient-to-r from-transparent via-green-600 to-transparent" />
        <div className="absolute bottom-1 left-1 right-1 h-px bg-gradient-to-r from-transparent via-green-600 to-transparent" />
        <div className="absolute top-1/2 left-1 right-1 h-px bg-green-700 transform -translate-y-1/2" />
      </div>

      <div className="absolute top-1 left-1 w-1 h-1 bg-green-500 rounded-full opacity-60" />
      <div className="absolute top-1 right-1 w-1 h-1 bg-green-500 rounded-full opacity-60" />
      <div className="absolute bottom-1 left-1 w-1 h-1 bg-green-500 rounded-full opacity-60" />
      <div className="absolute bottom-1 right-1 w-1 h-1 bg-green-500 rounded-full opacity-60" />
    </div>
  );
};

const DigitalCountdownTimer: React.FC = () => {
  const { projectionConfig } = useSelector((state: RootState) => state.financial);
  const {bankruptcyDate: defaultBankruptcyDate} = calculateProjectionData(projectionConfig);
  const [targetDate, setTargetDate] = useState(defaultBankruptcyDate);
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  });
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update target date when projection config changes
  useEffect(() => {
    const { bankruptcyDate: newBankruptcyDate} = calculateProjectionData(projectionConfig);
    setTargetDate(newBankruptcyDate);
  }, [projectionConfig]);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference > 0) {
      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      const milliseconds = Math.floor((difference % 1000) / 10);

      return { years, days, hours, minutes, seconds, milliseconds };
    }

    return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, targetDate]);

  const renderDigitPair = (value: number, label: string) => {
    const tens = Math.floor(value / 10) % 10;
    const ones = value % 10;

    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-1">
          <FlipDigit value={tens} />
          <FlipDigit value={ones} />
        </div>
        <span className="text-green-400 font-mono text-sm font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
    );
  };

  const renderTripleDigit = (value: number, label: string) => {
    const hundreds = Math.floor(value / 100) % 10;
    const tens = Math.floor(value / 10) % 10;
    const ones = value % 10;

    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-1">
          <FlipDigit value={hundreds} />
          <FlipDigit value={tens} />
          <FlipDigit value={ones} />
        </div>
        <span className="text-green-400 font-mono text-sm font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
    );
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(calculateTimeLeft());
  };

  return (
    <Card className="bg-gray-900/80 border-green-500/50 backdrop-blur-sm p-6 w-full shadow-2xl shadow-green-500/10">
      <div className="text-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-red-400 font-mono mb-2 drop-shadow-lg">
          🚨 BANKRUPTCY COUNTDOWN 🚨
        </h2>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <Button
          onClick={toggleTimer}
          variant="outline"
          className="bg-green-600 hover:bg-green-700 text-white border-green-500 font-mono text-xs"
        >
          {isRunning ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
          {isRunning ? "PAUSE" : "START"}
        </Button>
        <Button
          onClick={resetTimer}
          variant="outline"
          className="bg-red-600 hover:bg-red-700 text-white border-red-500 font-mono text-xs"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          RESET
        </Button>
      </div>

      <div className="flex justify-center items-center space-x-2 lg:space-x-4 flex-wrap gap-2">
        {renderDigitPair(timeLeft.years, "YEARS")}
        
        <div className="text-green-400 text-2xl lg:text-3xl font-mono font-bold flex items-center h-16">:</div>
        
        {renderTripleDigit(timeLeft.days, "DAYS")}
        
        <div className="text-green-400 text-2xl lg:text-3xl font-mono font-bold flex items-center h-16">:</div>
        
        {renderDigitPair(timeLeft.hours, "HOURS")}
        
        <div className="text-green-400 text-2xl lg:text-3xl font-mono font-bold flex items-center h-16">:</div>
        
        {renderDigitPair(timeLeft.minutes, "MINUTES")}
        
        <div className="text-green-400 text-2xl lg:text-3xl font-mono font-bold flex items-center h-16">:</div>
        
        {renderDigitPair(timeLeft.seconds, "SECONDS")}
        
        <div className="text-green-400 text-2xl lg:text-3xl font-mono font-bold flex items-center h-16">:</div>
        
        {renderDigitPair(timeLeft.milliseconds, "MILLISEC")}
      </div>

      <div className="text-center mt-4">
        <p className="text-green-300/60 font-mono text-xs">
          Target Date: {targetDate.toLocaleString()}
        </p>
      </div>
    </Card>
  );
};

export default DigitalCountdownTimer;