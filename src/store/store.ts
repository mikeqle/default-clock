import { configureStore } from '@reduxjs/toolkit';
import financialReducer from './financialSlice';

export const store = configureStore({
  reducer: {
    financial: financialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;