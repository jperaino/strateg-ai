import React, { useEffect } from "react";
import {
  BudgetCategory,
  BudgetCategoryType,
  BudgetSubCategory,
  HydratedBudgetCategory,
} from "./budget.interfaces";
import { useState } from "react";
import _ from "lodash";
import { useAuthContext } from "../firebase-vite-ui/Auth/AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  budgetCategoryConverter,
  budgetSubCategoryConverter,
} from "./budget.converters";
import { toast } from "sonner";

interface IBudgetContext {
  budgetCategories: BudgetCategory[] | null;
  budgetSubCategories: BudgetSubCategory[] | null;
  budget: HydratedBudgetCategory[] | null;
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
  const { userRef } = useAuthContext();

  const [budgetCategories, setBudgetCategories] = useState<
    BudgetCategory[] | null
  >(null);
  const [budgetSubCategories, setBudgetSubCategories] = useState<
    BudgetSubCategory[] | null
  >(null);
  const [budget, setBudget] = useState<HydratedBudgetCategory[] | null>(null);
  const [monthlyCashflow, setMonthlyCashflow] = useState<number>(0);

  useEffect(() => {
    if (budgetCategories && budgetSubCategories) {
      const tempBudget: HydratedBudgetCategory[] = budgetCategories.map(
        (category) => {
          // Get the list of subCategories for the current category
          const tempSubCategories = _.filter(
            budgetSubCategories,
            (subCategory) => {
              return subCategory.categoryId === category.id;
            }
          );

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
            ...category,
            amount: totalAmount,
            subCategories: tempSubCategories,
          };
        }
      );

      setBudget(tempBudget);
    } else {
      setBudget(null);
    }
  }, [budgetCategories, budgetSubCategories]);

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

  // Read Budget Categories
  useEffect(() => {
    if (userRef) {
      const budgetCategoriesRef = query(
        collection(userRef, "budgetCategories").withConverter(
          budgetCategoryConverter
        ),
        orderBy("name")
      );

      const unsubscribe = onSnapshot(
        budgetCategoriesRef,
        (QuerySnapshot) => {
          const tempBudgetCategories: BudgetCategory[] = [];
          QuerySnapshot.forEach((doc) => {
            tempBudgetCategories.push(doc.data());
          });
          setBudgetCategories(tempBudgetCategories);
        },
        (error) => {
          toast.error("Error getting categories", {
            description: error.message,
          });
        }
      );

      return () => unsubscribe();
    }
  }, [userRef]);

  // Read Budget SubCategories
  useEffect(() => {
    if (userRef) {
      const budgetSubCategoriesRef = query(
        collection(userRef, "budgetSubCategories").withConverter(
          budgetSubCategoryConverter
        ),
        orderBy("name")
      );

      const unsubscribe = onSnapshot(
        budgetSubCategoriesRef,
        (QuerySnapshot) => {
          const tempBudgetSubCategories: BudgetSubCategory[] = [];
          QuerySnapshot.forEach((doc) => {
            tempBudgetSubCategories.push(doc.data());
          });
          setBudgetSubCategories(tempBudgetSubCategories);
        },
        (error) => {
          toast.error("Error getting sub categories", {
            description: error.message,
          });
        }
      );

      return () => unsubscribe();
    }
  }, [userRef]);

  return (
    <Provider
      value={{
        budgetCategories,
        budgetSubCategories,
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
