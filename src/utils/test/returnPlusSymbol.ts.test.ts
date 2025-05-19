import returnPlusSymbol from "../returnPlusSymbol";

describe("returnPlusSymbol", () => {
  it("should return + for positive values", () => {
    expect(returnPlusSymbol("1")).toBe("+");
  });

  it("should return empty string for non-positive values", () => {
    expect(returnPlusSymbol("0")).toBe("");
    expect(returnPlusSymbol("-1")).toBe("");
  });
});
