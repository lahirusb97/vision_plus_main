import { describe, it, expect } from "vitest";
import { TypePrescription } from "../../model/RefractionDetailModel";
import { prescriptionTypeTextConvert } from "../prescriptionTypeTextConvert";

describe("prescriptionTypeTextConvert", () => {
  it('should return "Internal Prescription" when type is "internal"', () => {
    const result = prescriptionTypeTextConvert("internal" as TypePrescription);
    expect(result).toBe("Internal Prescription");
  });

  it('should return "Vision Plus Prescription" when type is "vision_plus"', () => {
    const result = prescriptionTypeTextConvert(
      "vision_plus" as TypePrescription
    );
    expect(result).toBe("Vision Plus Prescription");
  });

  it('should return "Other Prescription" when type is "other"', () => {
    const result = prescriptionTypeTextConvert("other" as TypePrescription);
    expect(result).toBe("Other Prescription");
  });

  it("should return empty string when type is null or undefined", () => {
    // Test with null
    const resultNull = prescriptionTypeTextConvert(
      null as unknown as TypePrescription
    );
    expect(resultNull).toBe("");

    // Test with undefined
    const resultUndefined = prescriptionTypeTextConvert(
      undefined as unknown as TypePrescription
    );
    expect(resultUndefined).toBe("");
  });

  it("should return empty string when type is an invalid value", () => {
    const result = prescriptionTypeTextConvert(
      "invalid_type" as TypePrescription
    );
    expect(result).toBe("");
  });
});
