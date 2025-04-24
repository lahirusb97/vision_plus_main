import { describe, it, expect } from "vitest";
import { PaymentModel } from "../../model/PaymentModel";
import { customerPaymentTotal } from "../customerPaymentTotal";

describe("customerPaymentTotal", () => {
  it("should return 0 for an empty payment list", () => {
    const payments: PaymentModel[] = [];
    expect(customerPaymentTotal(payments)).toBe(0);
  });

  it("should correctly sum valid payment amounts", () => {
    const payments: PaymentModel[] = [
      {
        id: 1,
        order: 101,
        payment_date: "2025-04-01",
        amount: "100.50",
        payment_method: "cash",
        transaction_status: "success",
        is_partial: false,
        is_final_payment: true,
      },
      {
        id: 2,
        order: 101,
        payment_date: "2025-04-02",
        amount: "200.00",
        payment_method: "credit_card",
        transaction_status: "success",
        is_partial: false,
        is_final_payment: false,
      },
    ];
    expect(customerPaymentTotal(payments)).toBe(300.5);
  });

  it("should handle invalid or empty amount values gracefully", () => {
    const payments: PaymentModel[] = [
      {
        id: 1,
        order: 101,
        payment_date: "2025-04-01",
        amount: "invalid",
        payment_method: "cash",
        transaction_status: "success",
        is_partial: false,
        is_final_payment: false,
      },
      {
        id: 2,
        order: 101,
        payment_date: "2025-04-02",
        amount: "",
        payment_method: "credit_card",
        transaction_status: "success",
        is_partial: false,
        is_final_payment: false,
      },
      {
        id: 3,
        order: 101,
        payment_date: "2025-04-03",
        amount: "150.75",
        payment_method: "online_transfer",
        transaction_status: "success",
        is_partial: false,
        is_final_payment: true,
      },
    ];
    expect(customerPaymentTotal(payments)).toBe(150.75);
  });

  it("should parse and sum string numbers with decimal points", () => {
    const payments: PaymentModel[] = [
      {
        id: 1,
        order: 101,
        payment_date: "2025-04-01",
        amount: "50.25",
        payment_method: "cash",
        transaction_status: "success",
        is_partial: false,
        is_final_payment: true,
      },
      {
        id: 2,
        order: 101,
        payment_date: "2025-04-02",
        amount: "49.75",
        payment_method: "credit_card",
        transaction_status: "success",
        is_partial: true,
        is_final_payment: false,
      },
    ];
    expect(customerPaymentTotal(payments)).toBe(100.0);
  });
});
