import React, { useEffect } from "react";
import {
  BudgetCategory,
  BudgetCategoryType,
  mockSubCategories,
} from "./budget.interfaces";
import { useState } from "react";
import _ from "lodash";

interface IBudgetContext {
  budget: BudgetCategory[] | null;
  monthlyCashflow: number;
}

const BudgetContext = React.createContext<IBudgetContext | undefined>(
  undefined
);
const Provider = BudgetContext.Provider;
const Consumer = BudgetContext.Consumer;

export const useBudgetContext = () => {
  const args = React.useContext(BudgetContext);

  if (!args) {
    throw new Error(
      "Cannot use this component outside of a valid Budget context."
    );
  }

  return args;
};

const BudgetContextProvider = (props: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [budget, setBudget] = useState<BudgetCategory[] | null>(null);
  const [monthlyCashflow, setMonthlyCashflow] = useState<number>(0);

  useEffect(() => {
    // Get unique categories from subcategories
    const uniqueCategories = _.uniq(
      mockSubCategories.map((sub) => sub.category)
    );

    console.log(uniqueCategories);

    // Get the list of subCategories for the current category
    const tempBudget: BudgetCategory[] = uniqueCategories.map((category) => {
      const tempSubCategories = _.filter(mockSubCategories, (subCategory) => {
        return subCategory.category === category;
      });

      // Get the total amount for the category, adding income and subtracting expenses
      const totalAmount = _.reduce(
        tempSubCategories,
        (total, { amount, type }) => {
          return type === BudgetCategoryType.INCOME
            ? total + amount
            : total - amount;
        },
        0
      );

      return {
        name: category,
        amount: totalAmount,
        subCategories: tempSubCategories,
      };
    });
    setBudget(tempBudget);
  }, [mockSubCategories]);

  useEffect(() => {
    const tempCashflow = _.reduce(
      budget,
      (total, { amount }) => {
        return total + amount;
      },
      0
    );

    setMonthlyCashflow(tempCashflow);
  }, [budget]);

  return (
    <Provider
      value={{
        budget,
        monthlyCashflow,
      }}
    >
      {props.children}
    </Provider>
  );
};

export {
  BudgetContext,
  BudgetContextProvider,
  Consumer as BudgetContextConsumer,
};
export default BudgetContext;
