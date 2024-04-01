export interface BudgetCategory {
  name: string;
  amount: number;
  subCategories: BudgetSubCategory[];
}

export interface BudgetSubCategory {
  name: string;
  category: string;
  amount: number;
  type: BudgetCategoryType;
}

export interface Budget {}

export enum BudgetCategoryType {
  INCOME = "income",
  EXPENSE = "expense",
}

// --------------------------------------------------

const mockCateogry1 = "Home";
const mockCateogry2 = "Food";
const mockCateogry3 = "Income";

export const mockSubCategories: BudgetSubCategory[] = [
  {
    name: "Rent",
    category: mockCateogry1,
    amount: 3850,
    type: BudgetCategoryType.EXPENSE,
  },
  {
    name: "Utilities",
    category: mockCateogry1,
    amount: 150,
    type: BudgetCategoryType.EXPENSE,
  },
  {
    name: "Groceries",
    category: mockCateogry2,
    amount: 600,
    type: BudgetCategoryType.EXPENSE,
  },
  {
    name: "Bars and alcohol",
    category: mockCateogry2,
    amount: 450,
    type: BudgetCategoryType.EXPENSE,
  },
  {
    name: "Restaurants",
    category: mockCateogry2,
    amount: 700,
    type: BudgetCategoryType.EXPENSE,
  },
  {
    name: "Paycheck",
    category: mockCateogry3,
    amount: 9000,
    type: BudgetCategoryType.INCOME,
  },
];
