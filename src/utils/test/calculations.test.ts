// InvoiceItemCalculateTotal.test.ts
import { describe, it, expect } from "vitest";
import { InvoiceItemCalculateTotal } from "../calculations";
import { OrderItem, FrameOrderItem } from "../../model/SingleInvoiceModel";

describe("InvoiceItemCalculateTotal", () => {
  // FrameOrderItem with additional fields
  it("should calculate totals for FrameOrderItem and ignore other fields", () => {
    const orderItems: FrameOrderItem[] = [
      {
        id: 1,
        order: 101,
        quantity: 2,
        price_per_unit: "100",
        subtotal: "200",
        frame: 1,
        lens_powers: [],
        other_item: null,
        other_item_detail: null,
        frame_detail: {
          id: 1,
          brand: 1,
          brand_name: "",
          code: 1,
          code_name: "",
          color: 1,
          color_name: "",
          price: "1000",
          size: "Full",
          species: "Metal",
          image: null,
        },
        lens: null,
        lens_detail: null,
        external_lens: null,
        external_lens_name: null,
        external_lens_powers: [],
        note: "Some note", // This should be ignored
      },
    ];

    const result = InvoiceItemCalculateTotal(orderItems);

    expect(result.quantity).toBe(2);
    expect(result.price_per_unit).toBe(100);
    expect(result.subtotal).toBe(200);
  });

  // Empty array test
  it("should handle an empty array and return zero totals", () => {
    const orderItems: OrderItem[] = [];

    const result = InvoiceItemCalculateTotal(orderItems);

    expect(result.quantity).toBe(0);
    expect(result.price_per_unit).toBe(0);
    expect(result.subtotal).toBe(0);
  });
  it("should handle an null ", () => {
    const orderItems: OrderItem[] = [];

    const result = InvoiceItemCalculateTotal(orderItems);

    expect(result.quantity).toBe(0);
    expect(result.price_per_unit).toBe(0);
    expect(result.subtotal).toBe(0);
  });
});
