import React, { createContext, useState, useContext } from 'react';

// Create the context
const BudgetContext = createContext();

// Provider component to wrap the app and provide the context
export const BudgetProvider = ({ children }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [savings, setSavings] = useState(0);
  return (
    <BudgetContext.Provider value={{ totalBudget, setSavings, setTotalBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};

// Custom hook to use the budget context
export const useBudget = () => {
  return useContext(BudgetContext);
};
