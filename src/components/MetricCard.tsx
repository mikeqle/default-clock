import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  trend?: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: "green" | "red" | "yellow" | "cyan";
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, icon: Icon, color = "green" }) => {
  const colorClasses = {
    green: "border-green-500/50 bg-green-900/20 text-green-400",
    red: "border-red-500/50 bg-red-900/20 text-red-400",
    yellow: "border-yellow-500/50 bg-yellow-900/20 text-yellow-400",
    cyan: "border-cyan-500/50 bg-cyan-900/20 text-cyan-400",
  };

  return (
    <Card className={`${colorClasses[color]} backdrop-blur-sm shadow-lg`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-mono uppercase tracking-wider">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono">{value}</div>
        {trend !== undefined && (
          <div className="flex items-center space-x-1 text-xs">
            {trend > 0 ? (
              <TrendingUp className="h-3 w-3 text-red-400" />
            ) : (
              <TrendingDown className="h-3 w-3 text-green-400" />
            )}
            <span className={trend > 0 ? "text-red-400" : "text-green-400"}>
              {Math.abs(trend).toFixed(1)}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard; 