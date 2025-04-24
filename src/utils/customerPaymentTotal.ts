import { PaymentModel } from "../model/PaymentModel";

/**
 * Calculates the total amount from a list of payment records.
 * Safely handles null, undefined, or empty arrays.
 */
export function customerPaymentTotal(payments?: PaymentModel[] | null): number {
  if (!Array.isArray(payments)) return 0;

  return payments.reduce((total, payment) => {
    const amount = parseFloat(payment.amount) || 0;
    return total + amount;
  }, 0);
}
