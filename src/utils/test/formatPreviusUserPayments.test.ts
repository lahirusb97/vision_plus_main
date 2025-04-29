import { describe, it, expect } from "vitest";

import { PaymentModel } from "../../model/PaymentModel";
import { formatPreviusUserPayments } from "../formatPreviusUserPayments";

describe("formatPreviusUserPayments", () => {
  it("should correctly format a single payment", () => {
    const input: PaymentModel[] = [
      {
        id: 1,
        order: 123,
        payment_date: "2025-04-28T12:00:00Z",
        amount: "150",
        payment_method: "credit_card",
        transaction_status: "success",
        is_partial: false,
        is_final_payment: true,
      },
    ];

    const expectedOutput = [
      {
        id: 1,
        amount: 150,
        payment_method: "credit_card",
        transaction_status: "success",
      },
    ];

    expect(formatPreviusUserPayments(input)).toEqual(expectedOutput);
  });

  it("should correctly parse multiple payments", () => {
    const input: PaymentModel[] = [
      {
        id: 2,
        order: 124,
        payment_date: "2025-04-28T13:00:00Z",
        amount: "200",
        payment_method: "cash",
        transaction_status: "success",
        is_partial: true,
        is_final_payment: false,
      },
      {
        id: 3,
        order: 125,
        payment_date: "2025-04-28T14:00:00Z",
        amount: "350",
        payment_method: "online_transfer",
        transaction_status: "pending",
        is_partial: false,
        is_final_payment: false,
      },
    ];

    const expectedOutput = [
      {
        id: 2,
        amount: 200,
        payment_method: "cash",
        transaction_status: "success",
      },
      {
        id: 3,
        amount: 350,
        payment_method: "online_transfer",
        transaction_status: "pending",
      },
    ];

    expect(formatPreviusUserPayments(input)).toEqual(expectedOutput);
  });

  it("should handle empty input array", () => {
    const input: PaymentModel[] = [];

    expect(formatPreviusUserPayments(input)).toEqual([]);
  });

  it("should correctly parse amount even if amount string has leading zeros", () => {
    const input: PaymentModel[] = [
      {
        id: 4,
        order: 126,
        payment_date: "2025-04-28T15:00:00Z",
        amount: "0075",
        payment_method: "cash",
        transaction_status: "success",
        is_partial: false,
        is_final_payment: false,
      },
    ];

    const expectedOutput = [
      {
        id: 4,
        amount: 75,
        payment_method: "cash",
        transaction_status: "success",
      },
    ];

    expect(formatPreviusUserPayments(input)).toEqual(expectedOutput);
  });
});
