import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FinancialData {
  quarter: string;
  collections: number;
  operationalExpenses: number;
  interestExpense: number;
  beginningDebt: number;
  endingDebt: number;
  effectiveInterestRate: number;
  debtIssuanceRequirement: number;
}

interface FinancialState {
  timeSeriesData: FinancialData[];
  currentDebt: number;
  projectedBankruptcyDate: string;
  isLoading: boolean;
}

const mockData: FinancialData[] = [
  {
    quarter: "Q1 2020",
    collections: 3200,
    operationalExpenses: 3800,
    interestExpense: 180,
    beginningDebt: 23200,
    endingDebt: 23980,
    effectiveInterestRate: 2.1,
    debtIssuanceRequirement: 780
  },
  {
    quarter: "Q2 2020",
    collections: 2800,
    operationalExpenses: 4200,
    interestExpense: 185,
    beginningDebt: 23980,
    endingDebt: 25565,
    effectiveInterestRate: 2.0,
    debtIssuanceRequirement: 1585
  },
  {
    quarter: "Q3 2020",
    collections: 3100,
    operationalExpenses: 4000,
    interestExpense: 190,
    beginningDebt: 25565,
    endingDebt: 26655,
    effectiveInterestRate: 1.9,
    debtIssuanceRequirement: 1090
  },
  {
    quarter: "Q4 2020",
    collections: 3500,
    operationalExpenses: 3900,
    interestExpense: 195,
    beginningDebt: 26655,
    endingDebt: 27250,
    effectiveInterestRate: 1.8,
    debtIssuanceRequirement: 595
  },
  {
    quarter: "Q1 2021",
    collections: 3400,
    operationalExpenses: 4100,
    interestExpense: 200,
    beginningDebt: 27250,
    endingDebt: 28150,
    effectiveInterestRate: 1.9,
    debtIssuanceRequirement: 900
  },
  {
    quarter: "Q2 2021",
    collections: 3600,
    operationalExpenses: 4300,
    interestExpense: 210,
    beginningDebt: 28150,
    endingDebt: 29060,
    effectiveInterestRate: 2.2,
    debtIssuanceRequirement: 910
  },
  {
    quarter: "Q3 2021",
    collections: 3750,
    operationalExpenses: 4200,
    interestExpense: 220,
    beginningDebt: 29060,
    endingDebt: 29730,
    effectiveInterestRate: 2.4,
    debtIssuanceRequirement: 670
  },
  {
    quarter: "Q4 2021",
    collections: 3900,
    operationalExpenses: 4100,
    interestExpense: 230,
    beginningDebt: 29730,
    endingDebt: 30160,
    effectiveInterestRate: 2.6,
    debtIssuanceRequirement: 430
  },
  {
    quarter: "Q1 2022",
    collections: 3850,
    operationalExpenses: 4500,
    interestExpense: 240,
    beginningDebt: 30160,
    endingDebt: 31050,
    effectiveInterestRate: 2.8,
    debtIssuanceRequirement: 890
  },
  {
    quarter: "Q2 2022",
    collections: 4000,
    operationalExpenses: 4600,
    interestExpense: 250,
    beginningDebt: 31050,
    endingDebt: 31900,
    effectiveInterestRate: 3.0,
    debtIssuanceRequirement: 850
  },
  {
    quarter: "Q3 2022",
    collections: 4100,
    operationalExpenses: 4700,
    interestExpense: 265,
    beginningDebt: 31900,
    endingDebt: 32765,
    effectiveInterestRate: 3.2,
    debtIssuanceRequirement: 865
  },
  {
    quarter: "Q4 2022",
    collections: 4200,
    operationalExpenses: 4800,
    interestExpense: 280,
    beginningDebt: 32765,
    endingDebt: 33645,
    effectiveInterestRate: 3.4,
    debtIssuanceRequirement: 880
  }
];

const initialState: FinancialState = {
  timeSeriesData: mockData,
  currentDebt: 33645,
  projectedBankruptcyDate: "2062-01-01T00:00:00",
  isLoading: false,
};

const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    setTimeSeriesData: (state, action: PayloadAction<FinancialData[]>) => {
      state.timeSeriesData = action.payload;
    },
    setCurrentDebt: (state, action: PayloadAction<number>) => {
      state.currentDebt = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTimeSeriesData, setCurrentDebt, setLoading } = financialSlice.actions;
export default financialSlice.reducer;