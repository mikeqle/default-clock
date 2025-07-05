import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings, RefreshCw } from "lucide-react";

interface ConfigurationPanelProps {
  onConfigChange: (config: ProjectionConfig) => void;
}

export interface ProjectionConfig {
  longTermInterestRate: number;
  receiptsGrowthRate: number;
  expensesGrowthRate: number;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  onConfigChange,
}) => {
  const [config, setConfig] = useState<ProjectionConfig>({
    longTermInterestRate: 3.04,
    receiptsGrowthRate: 4.96,
    expensesGrowthRate: 7.8,
  });

  const handleInputChange = (field: keyof ProjectionConfig, value: string) => {
    const numericValue = parseFloat(value) || 0;
    const newConfig = { ...config, [field]: numericValue };
    setConfig(newConfig);
  };

  const handleApplyChanges = () => {
    onConfigChange(config);
  };

  const handleReset = () => {
    const defaultConfig = {
      longTermInterestRate: 3.04,
      receiptsGrowthRate: 4.96,
      expensesGrowthRate: 7.8,
    };
    setConfig(defaultConfig);
    onConfigChange(defaultConfig);
  };

  return (
    <Card className="bg-gray-900/80 border-cyan-500/50 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-cyan-400 font-mono flex items-center justify-between text-sm sm:text-base">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>PROJECTION PARAMETERS</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Long Term Interest Rate */}
          <div className="space-y-2">
            <Label
              htmlFor="interestRate"
              className="text-cyan-300 font-mono text-xs sm:text-sm uppercase tracking-wider min-h-[2rem] sm:min-h-[2.5rem] flex items-center"
            >
              Long Term Interest Rate
            </Label>
            <div className="relative">
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={config.longTermInterestRate}
                onChange={(e) =>
                  handleInputChange("longTermInterestRate", e.target.value)
                }
                className="bg-gray-800/50 border-cyan-500/30 text-cyan-100 font-mono text-center pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xs sm:text-sm font-mono">
                %
              </span>
            </div>
            <p className="text-cyan-300/60 text-xs sm:text-xs font-mono">
              Average interest rate on government debt
            </p>
          </div>

          {/* Receipts Growth Rate */}
          <div className="space-y-2">
            <Label
              htmlFor="receiptsGrowth"
              className="text-green-300 font-mono text-xs sm:text-sm uppercase tracking-wider min-h-[2rem] sm:min-h-[2.5rem] flex items-center"
            >
              Total Receipts Growth
            </Label>
            <div className="relative">
              <Input
                id="receiptsGrowth"
                type="number"
                step="0.1"
                min="-10"
                max="15"
                value={config.receiptsGrowthRate}
                onChange={(e) =>
                  handleInputChange("receiptsGrowthRate", e.target.value)
                }
                className="bg-gray-800/50 border-green-500/30 text-green-100 font-mono text-center pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 text-xs sm:text-sm font-mono">
                %
              </span>
            </div>
            <p className="text-green-300/60 text-xs sm:text-xs font-mono">
              Annual growth rate of government revenue
            </p>
          </div>

          {/* Expenses Growth Rate */}
          <div className="space-y-2">
            <Label
              htmlFor="expensesGrowth"
              className="text-red-300 font-mono text-xs sm:text-sm uppercase tracking-wider min-h-[2rem] sm:min-h-[2.5rem] flex items-center"
            >
              Expenses Growth
            </Label>
            <div className="relative">
              <Input
                id="expensesGrowth"
                type="number"
                step="0.1"
                min="-5"
                max="20"
                value={config.expensesGrowthRate}
                onChange={(e) =>
                  handleInputChange("expensesGrowthRate", e.target.value)
                }
                className="bg-gray-800/50 border-red-500/30 text-red-100 font-mono text-center pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 text-xs sm:text-sm font-mono">
                %
              </span>
            </div>
            <p className="text-red-300/60 text-xs sm:text-xs font-mono">
              Annual growth rate (excluding interest)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-700/50">
          <Button
            onClick={handleApplyChanges}
            className="bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-500 font-mono text-xs sm:text-sm px-4 sm:px-6"
          >
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            UPDATE PROJECTION
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-500 font-mono text-xs sm:text-sm px-4 sm:px-6"
          >
            RESET TO DEFAULTS
          </Button>
        </div>

        {/* Current Values Display */}
        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-600/30">
          <h4 className="text-gray-300 font-mono text-xs sm:text-sm mb-3 uppercase tracking-wider">
            Current Configuration
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-center">
            <div>
              <div className="text-cyan-400 font-mono text-sm sm:text-lg font-bold">
                {config.longTermInterestRate}%
              </div>
              <div className="text-cyan-300/60 text-xs sm:text-xs font-mono">
                Interest Rate
              </div>
            </div>
            <div>
              <div className="text-green-400 font-mono text-sm sm:text-lg font-bold">
                {config.receiptsGrowthRate}%
              </div>
              <div className="text-green-300/60 text-xs sm:text-xs font-mono">
                Receipts Growth
              </div>
            </div>
            <div>
              <div className="text-red-400 font-mono text-sm sm:text-lg font-bold">
                {config.expensesGrowthRate}%
              </div>
              <div className="text-red-300/60 text-xs sm:text-xs font-mono">
                Expenses Growth
              </div>
            </div>
          </div>
        </div>

        {/* Default Values Note */}
        <div className="bg-gray-800/20 rounded-lg p-4 border border-gray-600/20">
          <h4 className="text-gray-400 font-mono text-xs sm:text-xs mb-2 uppercase tracking-wider">
            Default Values:
          </h4>
          <div className="space-y-1 text-xs sm:text-xs font-mono text-gray-400/80">
            <p>3.04% interest, based on actual US 2024 effective interest rate</p>
            <p>4.96% receipts growth and 7.8% expenses growth based on last ten years trends (2015-2024)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigurationPanel;
