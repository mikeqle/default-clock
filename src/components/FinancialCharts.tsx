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
  AreaChart,
  Area,
} from "recharts";

interface FinancialChartsProps {
  timeSeriesData: any[];
  formatCurrency: (value: number) => string;
}

const FinancialCharts: React.FC<FinancialChartsProps> = ({ timeSeriesData, formatCurrency }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card className="bg-gray-900/80 border-green-500/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-green-400 font-mono">
          National Debt Growth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={timeSeriesData}>
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
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}T`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #10B981",
                borderRadius: "8px",
                fontFamily: "monospace",
              }}
              formatter={(value: number) => [formatCurrency(value), "Debt"]}
            />
            <Area
              type="monotone"
              dataKey="endingDebt"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card className="bg-gray-900/80 border-green-500/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-green-400 font-mono">
          Revenue vs Expenses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
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
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}T`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #10B981",
                borderRadius: "8px",
                fontFamily: "monospace",
              }}
              formatter={(value: number) => [formatCurrency(value), ""]}
            />
            <Line
              type="monotone"
              dataKey="collections"
              stroke="#10B981"
              strokeWidth={2}
              name="Collections"
            />
            <Line
              type="monotone"
              dataKey="operationalExpenses"
              stroke="#F59E0B"
              strokeWidth={2}
              name="Operational Expenses"
            />
            <Line
              type="monotone"
              dataKey="interestExpense"
              stroke="#EF4444"
              strokeWidth={2}
              name="Interest Expense"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

export default FinancialCharts; 