export function formatPaymentMethod(method: string) {
  /**
   * Returns a user-friendly text for the given payment method.
   */
  if (method === "online_transfer") {
    return " Online";
  } else if (method === "cash") {
    return "Cash";
  } else if (method === "credit_card") {
    return "Card";
  } else {
    return "....";
  }
}
