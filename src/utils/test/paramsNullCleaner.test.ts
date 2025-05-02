// utils/paramsNullCleaner.test.ts
import { describe, it, expect } from "vitest";
import { paramsNullCleaner } from "../paramsNullCleaner";

describe("cleanObject", () => {
  it("removes null values", () => {
    const input = { a: 1, b: null, c: 2 };
    const result = paramsNullCleaner(input);
    expect(result).toEqual({ a: 1, c: 2 });
  });

  it("removes undefined values", () => {
    const input = { a: 1, b: undefined, c: 2 };
    const result = paramsNullCleaner(input);
    expect(result).toEqual({ a: 1, c: 2 });
  });

  it("removes empty string values", () => {
    const input = { a: 1, b: "", c: 2 };
    const result = paramsNullCleaner(input);
    expect(result).toEqual({ a: 1, c: 2 });
  });
  it("removes empty string values", () => {
    const input = { 1: { 1: null } };
    const result = paramsNullCleaner(input);
    expect(result).toEqual({ 1: { 1: null } });
  });
});
