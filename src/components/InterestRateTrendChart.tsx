import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface InterestRateTrendChartProps {
  timeSeriesData: any[];
}

const InterestRateTrendChart: React.FC<InterestRateTrendChartProps> = ({ timeSeriesData }) => (
  <Card className="bg-gray-900/80 border-green-500/50 backdrop-blur-sm">
    <CardHeader>
      <CardTitle className="text-green-400 font-mono">
        Effective Interest Rate Trend
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={timeSeriesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="quarter"
            stroke="#9CA3AF"
            fontSize={12}
            fontFamily="monospace"
          />
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
            fontFamily="monospace"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #10B981",
              borderRadius: "8px",
              fontFamily: "monospace",
            }}
            formatter={(value: number) => [`${value}%`, "Interest Rate"]}
          />
          <Line
            type="monotone"
            dataKey="effectiveInterestRate"
            stroke="#06B6D4"
            strokeWidth={3}
            dot={{ fill: "#06B6D4", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default InterestRateTrendChart; 