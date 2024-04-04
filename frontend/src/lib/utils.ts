import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatFinancial = (amount: number, cents = false): string => {
  const format = new Intl.NumberFormat(`en-US`, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: cents ? 2 : 0,
  });

  return format.format(amount);
};
