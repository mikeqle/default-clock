import { ProjectionConfig } from "@/store/financialSlice";

// Add a type for historical data
interface HistoricalYear {
  year: number;
  debt: number;
  receipts: number;
  expense: number;
  interest: number;
}

// Data structure for a single year's financials
export interface FinancialYear {
  year: number;
  outstandingDebt: number; // in billions
  totalReceipts: number; // in billions
  receiptsYoY: number; // percent
  operatingExpenses: number; // in billions (not incl. interest)
  expensesYoY: number; // percent
  interestExpense: number; // in billions
  effectiveInterestRate: number; // percent
  totalExpenses: number; // in billions
  interestPercentOfReceipts: number; // percent
  borrowingRequirement: number; // in billions
  status: "SAFE" | "BANKRUPT";
  isHistorical?: boolean;
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

// Historical data from 2010-2024 (in billions)
const historicalData: HistoricalYear[] = [
  {
    year: 2010,
    debt: 14025.215,
    receipts: 2205.766,
    expense: 3099.383,
    interest: 381.487,
  },
  {
    year: 2011,
    debt: 15222.94,
    receipts: 2326.136,
    expense: 3150.262,
    interest: 425.442,
  },
  {
    year: 2012,
    debt: 16432.73,
    receipts: 2509.209,
    expense: 3147.341,
    interest: 422.624,
  },
  {
    year: 2013,
    debt: 17156.119,
    receipts: 2824.88,
    expense: 2968.061,
    interest: 416.326,
  },
  {
    year: 2014,
    debt: 18141.444,
    receipts: 3093.432,
    expense: 3141.774,
    interest: 439.092,
  },
  {
    year: 2015,
    debt: 18922.179,
    receipts: 3274.863,
    expense: 3321.005,
    interest: 429.282,
  },
  {
    year: 2016,
    debt: 19976.827,
    receipts: 3241.9,
    expense: 3369.213,
    interest: 454.304,
  },
  {
    year: 2017,
    debt: 20492.747,
    receipts: 3343.634,
    expense: 3547.885,
    interest: 476.695,
  },
  {
    year: 2018,
    debt: 21974.096,
    receipts: 3330.47,
    expense: 3662.816,
    interest: 540.629,
  },
  {
    year: 2019,
    debt: 23201.38,
    receipts: 3497.469,
    expense: 3942.362,
    interest: 577.155,
  },
  {
    year: 2020,
    debt: 27747.798,
    receipts: 3416.814,
    expense: 6244.012,
    interest: 521.026,
  },
  {
    year: 2021,
    debt: 29617.215,
    receipts: 4294.468,
    expense: 6300.749,
    interest: 574.088,
  },
  {
    year: 2022,
    debt: 31419.689,
    receipts: 4869.814,
    expense: 5564.17,
    interest: 724.842,
  },
  {
    year: 2023,
    debt: 34001.494,
    receipts: 4521.307,
    expense: 5365.184,
    interest: 939.884,
  },
  {
    year: 2024,
    debt: 36218.605,
    receipts: 4893.471,
    expense: 5825.244,
    interest: 1101.366,
  },
];

// Enhanced bankruptcy calculation with configurable parameters
export const calculateBankruptcyDateWithConfig = (
  config: ProjectionConfig
): Date => {
  const currentYear = new Date().getFullYear();
  // Projection starts with current year. Get last year's data.
  const lastYear = currentYear - 1;
  // find in historical data the year that is closest to last year
  const lastYearData = historicalData.find((h) => h.year === lastYear);
  if (!lastYearData) {
    throw new Error("Last year data not found");
  }

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
      const monthsIntoYear = Math.min(
        11,
        Math.floor((interestExpense / receipts - 1) * 12)
      );
      const dayIntoMonth = Math.floor(Math.random() * 28) + 1; // Random day for variation
      return new Date(year, monthsIntoYear, dayIntoMonth, 12, 22, 0);
    }

    // Project next year
    receipts *= 1 + config.receiptsGrowthRate / 100;
    expenses *= 1 + config.expensesGrowthRate / 100;

    // Add deficit to debt
    const totalExpenses = expenses + interestExpense;
    const deficit = Math.max(0, totalExpenses - receipts);
    debt += deficit;
  }

  // Fallback if no bankruptcy found in 100 years
  return new Date(currentYear + 100, 0, 1, 12, 22, 0);
};

// Calculate detailed projection data for table display
export const calculateProjectionData = (
  config: ProjectionConfig
): { data: FinancialYear[]; bankruptcyDate: Date | null } => {
  const startYear = 2010;
  const endYear = 2100; // Show projections until 2100
  let bankruptcyDate: Date | null = null;

  const data: FinancialYear[] = [];

  for (let year = startYear; year <= endYear; year++) {
    let outstandingDebt: number,
      totalReceipts: number,
      operatingExpenses: number,
      effectiveInterestRate: number,
      interestExpense: number;
    const isHistorical = year <= 2024;

    if (isHistorical) {
      // Use historical data
      const historical = historicalData.find((h) => h.year === year);
      if (historical) {
        outstandingDebt = historical.debt;
        totalReceipts = historical.receipts;
        operatingExpenses = historical.expense;
        interestExpense = historical.interest;
        effectiveInterestRate =
          historical.debt > 0
            ? (historical.interest / historical.debt) * 100
            : 0;
      } else {
        continue; // Skip if no historical data
      }
    } else {
      // Project future years
      const prevYear: FinancialYear = data[data.length - 1];
      if (!prevYear) continue;

      totalReceipts =
        prevYear.totalReceipts * (1 + config.receiptsGrowthRate / 100);
      operatingExpenses =
        prevYear.operatingExpenses * (1 + config.expensesGrowthRate / 100);
      effectiveInterestRate = config.longTermInterestRate;
      outstandingDebt =
        prevYear.outstandingDebt + prevYear.borrowingRequirement;
      interestExpense = outstandingDebt * (effectiveInterestRate / 100);
    }

    // Calculate derived values
    const totalExpenses = operatingExpenses + interestExpense;
    const borrowingRequirement = Math.max(0, totalExpenses - totalReceipts);
    const interestPercentOfReceipts = (interestExpense / totalReceipts) * 100;
    const status = interestExpense >= totalReceipts ? "BANKRUPT" : "SAFE";
    const receiptsYoY: number = isHistorical
      ? year > startYear
        ? (totalReceipts /
            (data[data.length - 1]?.totalReceipts || totalReceipts) -
            1) *
          100
        : 0
      : config.receiptsGrowthRate;
    const expensesYoY: number = isHistorical
      ? year > startYear
        ? (operatingExpenses /
            (data[data.length - 1]?.operatingExpenses || operatingExpenses) -
            1) *
          100
        : 0
      : config.expensesGrowthRate;

    data.push({
      year,
      outstandingDebt: Number(outstandingDebt.toFixed(3)),
      totalReceipts: Number(totalReceipts.toFixed(3)),
      receiptsYoY: Number(receiptsYoY.toFixed(3)),
      operatingExpenses: Number(operatingExpenses.toFixed(3)),
      expensesYoY: Number(expensesYoY.toFixed(3)),
      interestExpense: Number(interestExpense.toFixed(3)),
      effectiveInterestRate: Number(effectiveInterestRate.toFixed(3)),
      totalExpenses: Number(totalExpenses.toFixed(3)),
      interestPercentOfReceipts: Number(interestPercentOfReceipts.toFixed(3)),
      borrowingRequirement: Number(borrowingRequirement.toFixed(3)),
      status,
      isHistorical,
    });

    if (status === "BANKRUPT") {
      // calculate bankruptcy date within the year
      const monthsIntoYear = Math.min(
        11,
        Math.floor((interestExpense / totalReceipts - 1) * 12)
      );
      const remainingInterestExpense =
        interestExpense - (monthsIntoYear * totalReceipts) / 12;
      const dayIntoMonth = remainingInterestExpense / (totalReceipts / 365);
      bankruptcyDate = new Date(year, monthsIntoYear, dayIntoMonth, 12, 22, 0);
    }

    if (status === "BANKRUPT") break;
  }

  return { data, bankruptcyDate };
};

// Function to project a single year (stub)
// export function projectFinancialYear(
//   prev: FinancialYear,
//   config: ProjectionTableConfig
// ): FinancialYear {
//   // Project receipts and expenses
//   const totalReceipts = prev.totalReceipts * (1 + config.receiptsYoY / 100);
//   const operatingExpenses =
//     prev.operatingExpenses * (1 + config.expensesYoY / 100);
//   const effectiveInterestRate =
//     prev.effectiveInterestRate * (1 + config.interestRateYoY / 100);

//   // Interest expense
//   const interestExpense = prev.outstandingDebt * (effectiveInterestRate / 100);

//   // Total expenses
//   const totalExpenses = operatingExpenses + interestExpense;

//   // Borrowing requirement
//   const borrowingRequirement = totalExpenses - totalReceipts;

//   // Outstanding debt
//   const outstandingDebt = prev.outstandingDebt + prev.borrowingRequirement;

//   // Interest % of receipts
//   const interestPercentOfReceipts = (interestExpense / totalReceipts) * 100;

//   // Status
//   const status = interestExpense < totalReceipts ? "SAFE" : "BANKRUPT";

//   return {
//     year: prev.year + 1,
//     outstandingDebt,
//     totalReceipts,
//     receiptsYoY: config.receiptsYoY,
//     operatingExpenses,
//     expensesYoY: config.expensesYoY,
//     interestExpense,
//     effectiveInterestRate,
//     totalExpenses,
//     interestPercentOfReceipts,
//     borrowingRequirement,
//     status,
//     isHistorical: prev.isHistorical,
//   };
// }
