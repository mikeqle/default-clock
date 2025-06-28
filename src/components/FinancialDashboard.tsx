import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import MetricCard from "@/components/MetricCard";
import FinancialCharts from "@/components/FinancialCharts";
import InterestRateTrendChart from "@/components/InterestRateTrendChart";
import { DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

// ===============================
// FINANCIAL DASHBOARD
// ===============================

const FinancialDashboard: React.FC = () => {
  const { timeSeriesData, currentDebt } = useSelector(
    (state: RootState) => state.financial
  );

  const latestData = timeSeriesData[timeSeriesData.length - 1];
  const deficitTrend = timeSeriesData
    .slice(-4)
    .map(
      (data) =>
        data.operationalExpenses + data.interestExpense - data.collections
    );
  const averageDeficit =
    deficitTrend.reduce((a, b) => a + b, 0) / deficitTrend.length;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value * 1000000000);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Current National Debt"
          value={formatCurrency(currentDebt)}
          icon={DollarSign}
          color="red"
        />
        <MetricCard
          title="Latest Quarter Deficit"
          value={formatCurrency(averageDeficit)}
          trend={12.5}
          icon={TrendingUp}
          color="red"
        />
        <MetricCard
          title="Interest Rate"
          value={`${latestData?.effectiveInterestRate}%`}
          trend={8.2}
          icon={AlertTriangle}
          color="yellow"
        />
        <MetricCard
          title="Debt Issuance Required"
          value={formatCurrency(latestData?.debtIssuanceRequirement || 0)}
          icon={DollarSign}
          color="cyan"
        />
      </div>

      {/* Charts */}
      <FinancialCharts timeSeriesData={timeSeriesData} formatCurrency={formatCurrency} />

      {/* Interest Rate Trend */}
      <InterestRateTrendChart timeSeriesData={timeSeriesData} />
    </div>
  );
};

export default FinancialDashboard;
