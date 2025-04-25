import { OrderItem } from "../model/SingleInvoiceModel";

export const calculateTotals = (orderItems) => {
  return orderItems.reduce(
    (acc, item) => {
      // Convert strings to numbers before performing calculations
      acc.quantity += parseInt(item.quantity, 10) || 0; // Ensure it's a valid number
      acc.price_per_unit += parseInt(item.price_per_unit) || 0; // Use parseFloat for decimal numbers
      acc.subtotal += parseInt(item.subtotal) || 0; // Use parseFloat for decimal numbers
      return acc;
    },
    { quantity: 0, price_per_unit: 0, subtotal: 0 }
  );
};
export const InvoiceItemCalculateTotal = (orderItems: OrderItem[]) => {
  return orderItems.reduce(
    (acc, item) => {
      acc.quantity += item.quantity;
      acc.price_per_unit += parseInt(item.price_per_unit);
      acc.subtotal += parseInt(item.subtotal);

      return acc;
    },
    {
      quantity: 0,
      price_per_unit: 0,
      subtotal: 0,
    }
  );
};
