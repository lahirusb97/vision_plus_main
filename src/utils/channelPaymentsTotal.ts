import { ChannelPaymentModel } from "../model/ChannelModel";
import stringToIntConver from "./stringToIntConver";

/**
 * Calculates the total amount from a list of payment records.
 * Safely handles null, undefined, or empty arrays.
 */
export function channelPaymentsTotal(
  payments?: Pick<ChannelPaymentModel, "amount">[] | null
): number {
  if (!Array.isArray(payments)) return 0;

  return payments.reduce((total, payment) => {
    const amount = stringToIntConver(payment.amount) || 0;
    return total + amount;
  }, 0);
}
