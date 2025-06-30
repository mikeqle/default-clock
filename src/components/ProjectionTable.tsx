import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TableIcon, Info } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { calculateProjectionData } from "@/utils/finance";

const ProjectionTable: React.FC = () => {
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

  const TreasuryTooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-1">
            {children}
            <Info className="h-3 w-3 text-purple-400/60 hover:text-purple-300 cursor-help" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-800 border-purple-500/50 text-purple-100 font-mono text-xs max-w-xs">
          <p>
            Historical data based on data provided by US Department of the Treasury.{" "}
            <a 
              href="https://fiscaldata.treasury.gov/datasets/historical-debt-outstanding/historical-debt-outstanding"
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

  const ReceiptsExpensesTooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-1">
            {children}
            <Info className="h-3 w-3 text-purple-400/60 hover:text-purple-300 cursor-help" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-800 border-purple-500/50 text-purple-100 font-mono text-xs max-w-xs">
          <p>
            Historical data based on data provided by US Department of the Treasury.{" "}
            <a 
              href="https://fiscaldata.treasury.gov/datasets/monthly-treasury-statement/summary-of-receipts-outlays-and-the-deficit-surplus-of-the-u-s-government"
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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="bg-purple-600 hover:bg-purple-700 text-white border-purple-500 font-mono text-sm"
        >
          <TableIcon className="h-4 w-4 mr-2" />
          VIEW PROJECTION
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] bg-gray-900/95 border-purple-500/50">
        <SheetHeader>
          <SheetTitle className="text-purple-400 font-mono text-xl">
            FINANCIAL PROJECTION DATA TABLE
          </SheetTitle>
          <SheetDescription className="text-purple-300/60 font-mono">
            Year-by-year breakdown of projected government finances until bankruptcy
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full mt-6">
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
                    <TreasuryTooltip>
                      <span>Outstanding debt</span>
                    </TreasuryTooltip>
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
                    <ReceiptsExpensesTooltip>
                      <span>Total receipts</span>
                    </ReceiptsExpensesTooltip>
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
                  <TableCell className="text-green-400 font-mono text-xs italic sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    YoY increase %
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`receipts-yoy-${data.year}`} 
                      className={`font-mono text-xs text-center ${
                        data.isHistorical ? 'text-blue-300/70' : 'text-green-300/70'
                      }`}
                    >
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
                  <TableCell className="text-yellow-400 font-mono text-xs italic sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    YoY increase %
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`expenses-yoy-${data.year}`} 
                      className={`font-mono text-xs text-center ${
                        data.isHistorical ? 'text-blue-300/70' : 'text-yellow-300/70'
                      }`}
                    >
                      {formatPercentage(data.expensesYoY)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Interest Expense */}
                <TableRow className="border-purple-500/20 hover:bg-purple-900/10">
                  <TableCell className="text-red-400 font-mono text-xs font-bold sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    Interest expense
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
                  <TableCell className="text-red-400 font-mono text-xs italic sticky left-0 bg-gray-900/95 border-r border-purple-500/30">
                    effective interest rate
                  </TableCell>
                  {projectionData.map((data) => (
                    <TableCell 
                      key={`rate-${data.year}`} 
                      className={`font-mono text-xs text-center font-bold ${
                        data.isHistorical ? 'text-blue-400' : 'text-blue-300'
                      }`}
                    >
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
                    <ReceiptsExpensesTooltip>
                      <span>Total expenses</span>
                    </ReceiptsExpensesTooltip>
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
                    Interest % of
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectionTable;