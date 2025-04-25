import { describe, it, expect } from "vitest";
import { planoConvert } from "../planoConvert";

describe("planoConvert", () => {
  it("should return 'PLANO' for numeric 0", () => {
    expect(planoConvert("0")).toBe("PLANO");
    expect(planoConvert("0.0")).toBe("PLANO");
    expect(planoConvert("0.00")).toBe("PLANO");
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
