import { OrderItem } from "../model/SingleInvoiceModel";

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
