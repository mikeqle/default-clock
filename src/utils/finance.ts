import { ProjectionConfig } from "@/store/financialSlice";

// Enhanced bankruptcy calculation with configurable parameters
export const calculateBankruptcyDateWithConfig = (config: ProjectionConfig): Date => {
  const currentYear = new Date().getFullYear();
  const currentDebt = 33645; // billions
  const currentReceipts = 4200; // billions (quarterly, so ~16.8T annually)
  const currentExpenses = 4800; // billions (quarterly, so ~19.2T annually)
  
  let debt = currentDebt * 4; // Convert to annual
  let receipts = currentReceipts * 4; // Convert to annual
  let expenses = currentExpenses * 4; // Convert to annual
  
  for (let year = currentYear; year < currentYear + 100; year++) {
    // Calculate interest expense
    const interestExpense = debt * (config.longTermInterestRate / 100);
    
    // Check if interest expense alone exceeds total receipts (bankruptcy condition)
    if (interestExpense >= receipts) {
      // Calculate more precise date within the year
      const monthsIntoYear = Math.min(11, Math.floor((interestExpense / receipts - 1) * 12));
      const dayIntoMonth = Math.floor(Math.random() * 28) + 1; // Random day for variation
      return new Date(year, monthsIntoYear, dayIntoMonth, 12, 22, 0);
    }
    
    // Project next year
    receipts *= (1 + config.receiptsGrowthRate / 100);
    expenses *= (1 + config.expensesGrowthRate / 100);
    
    // Add deficit to debt
    const totalExpenses = expenses + interestExpense;
    const deficit = Math.max(0, totalExpenses - receipts);
    debt += deficit;
  }
  
  // Fallback if no bankruptcy found in 100 years
  return new Date(currentYear + 100, 0, 1, 12, 22, 0);
};

// Calculate detailed projection data for table display
export const calculateProjectionData = (config: ProjectionConfig) => {
  const currentYear = new Date().getFullYear();
  const startYear = 2010;
  const endYear = 2100; // Show projections until 2100
  const totalYears = endYear - startYear + 1;
  
  // Historical data from 2010-2024 (in billions)
  const historicalData = [
    // 2010
    { year: 2010, debt: 13562, receipts: 2163, expenses: 3456, interestRate: 2.4 },
    // 2011
    { year: 2011, debt: 15223, receipts: 2304, expenses: 3603, interestRate: 2.8 },
    // 2012
    { year: 2012, debt: 16432, receipts: 2450, expenses: 3537, interestRate: 2.1 },
    // 2013
    { year: 2013, debt: 16738, receipts: 2775, expenses: 3455, interestRate: 2.3 },
    // 2014
    { year: 2014, debt: 17824, receipts: 3022, expenses: 3506, interestRate: 2.4 },
    // 2015
    { year: 2015, debt: 18151, receipts: 3250, expenses: 3688, interestRate: 2.1 },
    // 2016
    { year: 2016, debt: 19573, receipts: 3268, expenses: 3853, interestRate: 2.2 },
    // 2017
    { year: 2017, debt: 20245, receipts: 3316, expenses: 3982, interestRate: 2.3 },
    // 2018
    { year: 2018, debt: 21516, receipts: 3330, expenses: 4109, interestRate: 2.6 },
    // 2019
    { year: 2019, debt: 22719, receipts: 3462, expenses: 4448, interestRate: 2.4 },
    // 2020
    { year: 2020, debt: 26945, receipts: 3421, expenses: 6552, interestRate: 2.2 },
    // 2021
    { year: 2021, debt: 28428, receipts: 4047, expenses: 6822, interestRate: 1.6 },
    // 2022
    { year: 2022, debt: 30928, receipts: 4896, expenses: 6272, interestRate: 2.1 },
    // 2023
    { year: 2023, debt: 32665, receipts: 4439, expenses: 6134, interestRate: 3.3 },
    // 2024
    { year: 2024, debt: 35000, receipts: 4920, expenses: 6750, interestRate: 4.1 },
  ];
  
  const data = [];
  
  for (let year = startYear; year <= endYear; year++) {
    let outstandingDebt, totalReceipts, operatingExpenses, effectiveInterestRate;
    const isHistorical = year <= 2024;
    
    if (isHistorical) {
      // Use historical data
      const historical = historicalData.find(h => h.year === year);
      if (historical) {
        outstandingDebt = historical.debt;
        totalReceipts = historical.receipts;
        operatingExpenses = historical.expenses;
        effectiveInterestRate = historical.interestRate;
      } else {
        continue; // Skip if no historical data
      }
    } else {
      // Project future years
      const prevYear = data[data.length - 1];
      if (!prevYear) continue;
      
      totalReceipts = prevYear.totalReceipts * (1 + config.receiptsGrowthRate / 100);
      operatingExpenses = prevYear.operatingExpenses * (1 + config.expensesGrowthRate / 100);
      effectiveInterestRate = config.longTermInterestRate;
      
      // Calculate debt from previous year plus new borrowing
      const interestExpense = prevYear.outstandingDebt * (effectiveInterestRate / 100);
      const totalExpenses = operatingExpenses + interestExpense;
      const borrowingRequirement = Math.max(0, totalExpenses - totalReceipts);
      outstandingDebt = prevYear.outstandingDebt + borrowingRequirement;
    }
    
    // Calculate derived values
    const interestExpense = outstandingDebt * (effectiveInterestRate / 100);
    
    // Total expenses
    const totalExpenses = operatingExpenses + interestExpense;
    
    // Borrowing requirement (deficit)
    const borrowingRequirement = Math.max(0, totalExpenses - totalReceipts);
    
    // Interest as percentage of receipts
    const interestPercentOfReceipts = (interestExpense / totalReceipts) * 100;
    
    // Status
    const status = interestExpense >= totalReceipts ? 'BANKRUPT' : 'SAFE';
    
    // Delta debt (new borrowing)
    const deltaDebt = isHistorical ? 
      (year > startYear ? outstandingDebt - (data[data.length - 1]?.outstandingDebt || 0) : 0) : 
      borrowingRequirement;
    
    // Growth rates
    const receiptsYoY = isHistorical ? 
      (year > startYear ? ((totalReceipts / (data[data.length - 1]?.totalReceipts || totalReceipts) - 1) * 100) : 0) :
      config.receiptsGrowthRate;
      
    const expensesYoY = isHistorical ?
      (year > startYear ? ((operatingExpenses / (data[data.length - 1]?.operatingExpenses || operatingExpenses) - 1) * 100) : 0) :
      config.expensesGrowthRate;
    
    data.push({
      year,
      outstandingDebt: Math.round(outstandingDebt),
      deltaDebt: Math.round(deltaDebt),
      totalReceipts: Math.round(totalReceipts),
      receiptsYoY: Math.round(receiptsYoY * 100) / 100,
      operatingExpenses: Math.round(operatingExpenses),
      expensesYoY: Math.round(expensesYoY * 100) / 100,
      interestExpense: Math.round(interestExpense),
      effectiveInterestRate: Math.round(effectiveInterestRate * 100) / 100,
      totalExpenses: Math.round(totalExpenses),
      interestPercentOfReceipts: Math.round(interestPercentOfReceipts * 100) / 100,
      borrowingRequirement: Math.round(borrowingRequirement),
      status,
      isHistorical,
    });
    
    // If bankrupt, stop projecting
    if (status === 'BANKRUPT') break;
  }
  
  return data;
};

export const getBankruptcyDate = (): Date => {
  return new Date("2061-08-14T12:22:00"); // sample date. will do more later
};

// Data structure for a single year's financials
export interface FinancialYear {
  year: number;
  outstandingDebt: number; // in billions
  deltaDebt: number; // in billions
  totalReceipts: number; // in billions
  receiptsYoY: number; // percent
  operatingExpenses: number; // in billions (not incl. interest)
  expensesYoY: number; // percent
  interestExpense: number; // in billions
  effectiveInterestRate: number; // percent
  totalExpenses: number; // in billions
  interestPercentOfReceipts: number; // percent
  borrowingRequirement: number; // in billions
  status: 'SAFE' | 'BANKRUPT';
}

// Configurable parameters for projections
export interface ProjectionTableConfig {
  initialYear: number;
  initialOutstandingDebt: number;
  initialReceipts: number;
  receiptsYoY: number;
  initialOperatingExpenses: number;
  expensesYoY: number;
  initialInterestRate: number;
  interestRateYoY: number;
  projectionYears: number;
}

// Function to project a single year (stub)
export function projectFinancialYear(
  prev: FinancialYear,
  config: ProjectionTableConfig
): FinancialYear {
  // Project receipts and expenses
  const totalReceipts = prev.totalReceipts * (1 + config.receiptsYoY / 100);
  const operatingExpenses = prev.operatingExpenses * (1 + config.expensesYoY / 100);
  const effectiveInterestRate = prev.effectiveInterestRate * (1 + config.interestRateYoY / 100);

  // Interest expense
  const interestExpense = prev.outstandingDebt * (effectiveInterestRate / 100);

  // Total expenses
  const totalExpenses = operatingExpenses + interestExpense;

  // Borrowing requirement
  const borrowingRequirement = totalExpenses - totalReceipts;

  // Δ debt
  const deltaDebt = borrowingRequirement > 0 ? borrowingRequirement : 0;

  // Outstanding debt
  const outstandingDebt = prev.outstandingDebt + deltaDebt;

  // Interest % of receipts
  const interestPercentOfReceipts = (interestExpense / totalReceipts) * 100;

  // Status
  const status = interestExpense < totalReceipts ? 'SAFE' : 'BANKRUPT';

  return {
    year: prev.year + 1,
    outstandingDebt,
    deltaDebt,
    totalReceipts,
    receiptsYoY: config.receiptsYoY,
    operatingExpenses,
    expensesYoY: config.expensesYoY,
    interestExpense,
    effectiveInterestRate,
    totalExpenses,
    interestPercentOfReceipts,
    borrowingRequirement,
    status,
  };
}

// Function to run the projection until bankruptcy, allowing for historical data
export function calculateBankruptcyDate(
  config: ProjectionConfig,
  historicalData: FinancialYear[] = []
): FinancialYear[] {
  const years: FinancialYear[] = [...historicalData];
  let startYear: number;
  let baseYear: FinancialYear;

  if (historicalData.length > 0) {
    baseYear = historicalData[historicalData.length - 1];
    startYear = baseYear.year + 1;
  } else {
    baseYear = {
      year: config.initialYear,
      outstandingDebt: config.initialOutstandingDebt,
      deltaDebt: 0,
      totalReceipts: config.initialReceipts,
      receiptsYoY: config.receiptsYoY,
      operatingExpenses: config.initialOperatingExpenses,
      expensesYoY: config.expensesYoY,
      interestExpense: config.initialOutstandingDebt * (config.initialInterestRate / 100),
      effectiveInterestRate: config.initialInterestRate,
      totalExpenses: config.initialOperatingExpenses + (config.initialOutstandingDebt * (config.initialInterestRate / 100)),
      interestPercentOfReceipts: (config.initialOutstandingDebt * (config.initialInterestRate / 100)) / config.initialReceipts * 100,
      borrowingRequirement: (config.initialOperatingExpenses + (config.initialOutstandingDebt * (config.initialInterestRate / 100))) - config.initialReceipts,
      status: (config.initialOutstandingDebt * (config.initialInterestRate / 100)) < config.initialReceipts ? 'SAFE' : 'BANKRUPT',
    };
    startYear = config.initialYear;
    years.push(baseYear);
  }

  for (let i = 1; i < config.projectionYears; i++) {
    const prev = years[years.length - 1];
    if (prev.status === 'BANKRUPT') break;
    // Only project if this year is not already in historical data
    if (prev.year >= startYear) {
      years.push(projectFinancialYear(prev, config));
    }
  }

  return years;
}
