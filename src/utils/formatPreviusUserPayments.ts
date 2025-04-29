import { PaymentModel } from "../model/PaymentModel";

export const formatPreviusUserPayments = (prePayments: PaymentModel[]) => {
  return prePayments.map(
    ({ id, amount, payment_method, transaction_status }) => ({
      id,
      amount: parseInt(amount),
      payment_method,
      transaction_status,
    })
  );
};
