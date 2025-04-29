import { describe, it, expect } from "vitest";
import { formatUserPayments } from "../formatUserPayments";

describe("formatUserPayments", () => {
  it("should format only non-zero payments correctly", () => {
    const input = {
      credit_card: 100,
      cash: 0,
      online_transfer: 50,
    };

    const expectedOutput = [
      {
        amount: 100,
        payment_method: "credit_card",
        transaction_status: "success",
      },
      {
        amount: 50,
        payment_method: "online_transfer",
        transaction_status: "success",
      },
    ];

    expect(formatUserPayments(input)).toEqual(expectedOutput);
  });

  it("should return an empty array when all payments are zero", () => {
    const input = {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
    };

    expect(formatUserPayments(input)).toEqual([]);
  });

  it("should handle all non-zero payments", () => {
    const input = {
      credit_card: 10,
      cash: 20,
      online_transfer: 30,
    };

    const expectedOutput = [
      {
        amount: 10,
        payment_method: "credit_card",
        transaction_status: "success",
      },
      {
        amount: 20,
        payment_method: "cash",
        transaction_status: "success",
      },
      {
        amount: 30,
        payment_method: "online_transfer",
        transaction_status: "success",
      },
    ];

    expect(formatUserPayments(input)).toEqual(expectedOutput);
  });
});
