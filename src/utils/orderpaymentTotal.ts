import { PaymentModel } from "../model/PaymentModel";

export const orderpaymentTotal = (
  payments: PaymentModel[] | null | undefined
): number => {
  if (!Array.isArray(payments)) {
    return 0; // Return 0 if payments is null or undefined
  }

  return payments.reduce(
    (total, payment) => total + parseFloat(payment.amount),
    0
  );
};

export const safeParseFloat = (value: any): number => {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num; // If NaN, return 0 instead
};
