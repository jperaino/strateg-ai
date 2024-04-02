export interface FireBudgetCategory {
  name: string;
  icon: string;
}
export interface BudgetCategory extends FireBudgetCategory {
  id: string;
}

export interface HydratedBudgetCategory extends BudgetCategory {
  amount: number;
  subCategories: BudgetSubCategory[];
}

export interface FireBudgetSubCategory {
  name: string;
  categoryId: string;
  amount: number;
  type: BudgetCategoryType;
}

export interface BudgetSubCategory extends FireBudgetSubCategory {
  id: string;
}

export interface Budget {}

export enum BudgetCategoryType {
  INCOME = "income",
  EXPENSE = "expense",
}

// --------------------------------------------------

export const mockSubCategories: BudgetSubCategory[] = [];
