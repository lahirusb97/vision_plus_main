import { describe, it, expect } from "vitest";
import { planoConvert } from "../planoConvert";

describe("planoConvert", () => {
  it("should return 'Plano' for numeric 0", () => {
    expect(planoConvert("0")).toBe("Plano");
    expect(planoConvert("0.0")).toBe("Plano");
    expect(planoConvert("0.00")).toBe("Plano");
  });

  it("should return an empty string for null or undefined", () => {
    expect(planoConvert(null)).toBe("");
    expect(planoConvert(undefined)).toBe("");
  });

  it("should return the original string for non-zero values", () => {
    expect(planoConvert("0.25")).toBe("0.25");
    expect(planoConvert("-0.25")).toBe("-0.25");
    expect(planoConvert("+1")).toBe("+1");
    expect(planoConvert("+0.25")).toBe("+0.25");
  });
});
