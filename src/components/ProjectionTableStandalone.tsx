import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, TableIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { calculateProjectionData } from "@/utils/finance";

interface TooltipInfoProps {
  text: string;
  sourceLink: string;
  delayDuration?: number;
  children: React.ReactNode;
}

const TooltipInfo: React.FC<TooltipInfoProps> = ({ text, sourceLink, delayDuration = 100, children }) => (
  <TooltipProvider>
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>
        <div className="flex items-center space-x-1">
          {children}
          <Info className="h-3 w-3 text-purple-400/60 hover:text-purple-300 cursor-help" />
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-gray-800 border-purple-500/50 text-purple-100 font-mono text-xs max-w-xs">
        <p>
          {text}{" "}
          <a 
            href={sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 underline"
          >
            Source here
          </a>
          .
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const ProjectionTableStandalone: React.FC = () => {
  const { projectionConfig } = useSelector((state: RootState) => state.financial);
  const projectionData = calculateProjectionData(projectionConfig);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <Card className="bg-gray-900/95 border-purple-500/50 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-purple-400 font-mono text-xl flex items-center space-x-2">
          <TableIcon className="h-5 w-5" />
          <span>FINANCIAL PROJECTION DATA TABLE</span>
        </CardTitle>
        <p className="text-purple-300/60 font-mono text-sm">
          Year-by-year breakdown of projected government finances until bankruptcy
        </p>
        <div className="mt-4 p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg">
          <h4 className="text-cyan-400 font-mono text-sm font-bold mb-2 flex items-center">
            🎯 KEY MODEL ASSUMPTIONS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300">Projected Interest Rate: {projectionConfig.longTermInterestRate}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300">Receipts Growth: {projectionConfig.receiptsGrowthRate}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-300">Expenses Growth: {projectionConfig.expensesGrowthRate}%</span>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-2">
            💡 These highlighted values drive the entire projection model. Adjust them in the configuration panel above.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto" style={{ scrollbarWidth: 'auto' }}>
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="border-purple-500/30 hover:bg-purple-900/20">
                  <TableHead className="text-purple-300 font-mono text-xs sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    (in billions)
                  </TableHead>
                  {projectionData.map((data) => (
                    <TableHead 
                      key={data.year} 
                      className={`font-mono text-xs text-center min-w-[100px] ${
                        data.isHistorical ? 'text-blue-300' : 'text-purple-300'
                      }`}
                    >
                      {data.year}
                      {data.isHistorical && (
                        <div className="text-blue-400/60 text-[10px] mt-1">HISTORICAL</div>
                      )}
                      {!data.isHistorical && (
                        <div className="text-purple-400/60 text-[10px] mt-1">PROJECTED</div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Outstanding Debt */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-cyan-400 font-mono text-xs font-bold sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    <TooltipInfo text="Historical data based on data provided by US Department of the Treasury." sourceLink="https://fiscaldata.treasury.gov/datasets/historical-debt-outstanding/historical-debt-outstanding">
                      <span>Outstanding debt</span>
                    </TooltipInfo>
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`debt-${data.year}`} 
                      className={`font-mono text-xs text-center ${
                        data.isHistorical ? 'text-blue-300' : 'text-cyan-300'
                      }`}
                    >
                      {formatCurrency(data.outstandingDebt)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Delta Debt */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-cyan-400 font-mono text-xs font-bold sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    Δ debt
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`delta-${data.year}`} 
                      className={`font-mono text-xs text-center ${
                        data.isHistorical ? 'text-blue-300' : 'text-cyan-300'
                      }`}
                    >
                      {formatCurrency(data.deltaDebt)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Empty Row */}
                <TableRow>
                  <TableCell colSpan={projectionData.length + 1} className="h-4"></TableCell>
                </TableRow>

                {/* Total Receipts */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-green-400 font-mono text-xs font-bold sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    <TooltipInfo text="Historical data based on data provided by US Department of the Treasury." sourceLink="https://fiscaldata.treasury.gov/datasets/monthly-treasury-statement/summary-of-receipts-outlays-and-the-deficit-surplus-of-the-u-s-government">
                      <span>Total receipts</span>
                    </TooltipInfo>
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`receipts-${data.year}`} 
                      className={`font-mono text-xs text-center ${
                        data.isHistorical ? 'text-blue-300' : 'text-green-300'
                      }`}
                    >
                      {formatCurrency(data.totalReceipts)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* YoY Increase % */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-green-400 font-mono text-xs italic sticky left-0 bg-gray-900/95 border-r border-purple-500/30 relative">
                    YoY increase %
                    {/* Highlight for projected assumptions */}
                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full opacity-80"></div>
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`receipts-yoy-${data.year}`} 
                      className={`font-mono text-xs text-center relative ${
                        data.isHistorical ? 'text-blue-300/70' : 'text-green-300/70 bg-green-900/20 border border-green-500/30'
                      }`}
                    >
                      {!data.isHistorical && (
                        <div className="absolute inset-0 bg-green-400/10 rounded animate-pulse"></div>
                      )}
                      {formatPercentage(data.receiptsYoY)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Empty Row */}
                <TableRow>
                  <TableCell colSpan={projectionData.length + 1} className="h-4"></TableCell>
                </TableRow>

                {/* Operating Expenses */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-yellow-400 font-mono text-xs font-bold sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    Operating expenses (not incl. interests)
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`expenses-${data.year}`} 
                      className={`font-mono text-xs text-center ${
                        data.isHistorical ? 'text-blue-300' : 'text-yellow-300'
                      }`}
                    >
                      -{formatCurrency(data.operatingExpenses)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* YoY Increase % */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-yellow-400 font-mono text-xs italic sticky left-0 bg-gray-900/95 border-r border-purple-500/30 relative">
                    YoY increase %
                    {/* Highlight for projected assumptions */}
                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full opacity-80"></div>
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`expenses-yoy-${data.year}`} 
                      className={`font-mono text-xs text-center relative ${
                        data.isHistorical ? 'text-blue-300/70' : 'text-yellow-300/70 bg-yellow-900/20 border border-yellow-500/30'
                      }`}
                    >
                      {!data.isHistorical && (
                        <div className="absolute inset-0 bg-yellow-400/10 rounded animate-pulse"></div>
                      )}
                      {formatPercentage(data.expensesYoY)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Interest Expense */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-red-400 font-mono text-xs font-bold sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    <TooltipInfo text="Historical interest expense data from Federal Reserve Economic Data (FRED)." sourceLink="https://fred.stlouisfed.org/series/FYOINT">
                      <span>Interest expense</span>
                    </TooltipInfo>
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`interest-${data.year}`} 
                      className={`font-mono text-xs text-center ${
                        data.isHistorical ? 'text-blue-300' : 'text-red-300'
                      }`}
                    >
                      -{formatCurrency(data.interestExpense)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Effective Interest Rate */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-red-400 font-mono text-xs italic sticky left-0 bg-gray-900/95 border-r border-purple-500/30 relative">
                    effective interest rate
                    {/* Highlight for projected assumptions */}
                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full opacity-80"></div>
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`rate-${data.year}`} 
                      className={`font-mono text-xs text-center font-bold relative ${
                        data.isHistorical ? 'text-blue-400' : 'text-blue-300 bg-blue-900/20 border border-blue-500/30'
                      }`}
                    >
                      {!data.isHistorical && (
                        <div className="absolute inset-0 bg-blue-400/10 rounded animate-pulse"></div>
                      )}
                      {formatPercentage(data.effectiveInterestRate)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Empty Row */}
                <TableRow>
                  <TableCell colSpan={projectionData.length + 1} className="h-4"></TableCell>
                </TableRow>

                {/* Total Expenses */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-red-400 font-mono text-xs font-bold sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    <TooltipInfo text="Historical data based on data provided by US Department of the Treasury." sourceLink="https://fiscaldata.treasury.gov/datasets/monthly-treasury-statement/summary-of-receipts-outlays-and-the-deficit-surplus-of-the-u-s-government">
                      <span>Total expenses</span>
                    </TooltipInfo>
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`total-expenses-${data.year}`} 
                      className={`font-mono text-xs text-center ${
                        data.isHistorical ? 'text-blue-300' : 'text-red-300'
                      }`}
                    >
                      -{formatCurrency(data.totalExpenses)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Empty Row */}
                <TableRow>
                  <TableCell colSpan={projectionData.length + 1} className="h-4"></TableCell>
                </TableRow>

                {/* Interest % of Receipts */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-orange-400 font-mono text-xs font-bold sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    Interest % of receipts
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`interest-pct-${data.year}`} 
                      className={`font-mono text-xs text-center font-bold ${
                        data.interestPercentOfReceipts > 100 
                          ? 'text-red-400' 
                          : data.isHistorical 
                            ? 'text-blue-300' 
                            : 'text-orange-300'
                      }`}
                    >
                      {formatPercentage(data.interestPercentOfReceipts)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Borrowing Requirement */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-orange-400 font-mono text-xs font-bold sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    Borrowing requirement
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`borrowing-${data.year}`} 
                      className={`font-mono text-xs text-center ${
                        data.isHistorical ? 'text-blue-300' : 'text-orange-300'
                      }`}
                    >
                      {formatCurrency(data.borrowingRequirement)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Empty Row */}
                <TableRow>
                  <TableCell colSpan={projectionData.length + 1} className="h-4"></TableCell>
                </TableRow>

                {/* Status Row */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-white font-mono text-xs font-bold sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    Safe if Interest &lt; Total receipts. Bankrupt if Interest &gt; Receipts
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`status-${data.year}`} 
                      className={`font-mono text-xs text-center font-bold ${
                        data.status === 'BANKRUPT' ? 'text-red-400' : 'text-green-400'
                      }`}
                    >
                      {data.status}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectionTableStandalone;