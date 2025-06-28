import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';

const FinancialDashboard: React.FC = () => {
  const { timeSeriesData, currentDebt } = useSelector((state: RootState) => state.financial);

  const latestData = timeSeriesData[timeSeriesData.length - 1];
  const deficitTrend = timeSeriesData.slice(-4).map(data => 
    data.operationalExpenses + data.interestExpense - data.collections
  );
  const averageDeficit = deficitTrend.reduce((a, b) => a + b, 0) / deficitTrend.length;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value * 1000000000);
  };

  const MetricCard = ({ 
    title, 
    value, 
    trend, 
    icon: Icon, 
    color = 'green' 
  }: {
    title: string;
    value: string;
    trend?: number;
    icon: React.ComponentType<any>;
    color?: 'green' | 'red' | 'yellow' | 'cyan';
  }) => {
    const colorClasses = {
      green: 'border-green-500/50 bg-green-900/20 text-green-400',
      red: 'border-red-500/50 bg-red-900/20 text-red-400',
      yellow: 'border-yellow-500/50 bg-yellow-900/20 text-yellow-400',
      cyan: 'border-cyan-500/50 bg-cyan-900/20 text-cyan-400'
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
              <span className={trend > 0 ? 'text-red-400' : 'text-green-400'}>
                {Math.abs(trend).toFixed(1)}%
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    );
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/80 border-green-500/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-green-400 font-mono">National Debt Growth</CardTitle>
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
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}T`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #10B981',
                    borderRadius: '8px',
                    fontFamily: 'monospace'
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Debt']}
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
            <CardTitle className="text-green-400 font-mono">Revenue vs Expenses</CardTitle>
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
                  tickFormatter={(value) => `$${(value/1000).toFixed(1)}T`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #10B981',
                    borderRadius: '8px',
                    fontFamily: 'monospace'
                  }}
                  formatter={(value: number) => [formatCurrency(value), '']}
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

      {/* Interest Rate Trend */}
      <Card className="bg-gray-900/80 border-green-500/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-400 font-mono">Effective Interest Rate Trend</CardTitle>
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
                  backgroundColor: '#1F2937',
                  border: '1px solid #10B981',
                  borderRadius: '8px',
                  fontFamily: 'monospace'
                }}
                formatter={(value: number) => [`${value}%`, 'Interest Rate']}
              />
              <Line
                type="monotone"
                dataKey="effectiveInterestRate"
                stroke="#06B6D4"
                strokeWidth={3}
                dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialDashboard;