export function formatUserPayments(userPayments) {
  return Object.keys(userPayments)
    .filter((paymentMethod) => userPayments[paymentMethod] > 0) // Remove zero amounts
    .map((paymentMethod) => ({
      amount: userPayments[paymentMethod],
      payment_method: paymentMethod,
      transaction_status: "success", // Assuming success by default
    }));
}
