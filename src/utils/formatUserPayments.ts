interface UserPayments {
  credit_card: number;
  cash: number;
  online_transfer: number;
}

export function formatUserPayments(userPayments: UserPayments) {
  return Object.keys(userPayments)
    .filter(
      (paymentMethod) => userPayments[paymentMethod as keyof UserPayments] > 0
    ) // Remove zero amounts
    .map((paymentMethod) => ({
      amount: userPayments[paymentMethod as keyof UserPayments],
      payment_method: paymentMethod,
      transaction_status: "success", // Assuming success by default
    }));
}
