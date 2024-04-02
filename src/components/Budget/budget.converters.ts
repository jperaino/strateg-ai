import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import {
  BudgetCategory,
  BudgetSubCategory,
  BudgetCategoryType,
} from "./budget.interfaces";

export const budgetCategoryConverter: FirestoreDataConverter<BudgetCategory> = {
  toFirestore: (
    budgetCategory: WithFieldValue<BudgetCategory>
  ): DocumentData => {
    return {
      name: budgetCategory.name,
      icon: budgetCategory.icon,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): BudgetCategory => {
    const id = () => snapshot.id;
    const data = snapshot.data(options)!;
    const { name, icon } = data;
    return {
      id: id(),
      name,
      icon,
    };
  },
};

export const budgetSubCategoryConverter: FirestoreDataConverter<BudgetSubCategory> =
  {
    toFirestore: (
      budgetSubCategory: WithFieldValue<BudgetSubCategory>
    ): DocumentData => {
      return {
        name: budgetSubCategory.name,
        categoryId: budgetSubCategory.categoryId,
        amount: budgetSubCategory.amount,
      };
    },
    fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): BudgetSubCategory => {
      const id = () => snapshot.id;
      const data = snapshot.data(options)!;
      const { name, amount, categoryId, type } = data;
      return {
        id: id(),
        name,
        amount: Number(amount),
        categoryId,
        type: type as BudgetCategoryType,
      };
    },
  };
