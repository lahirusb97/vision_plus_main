import { formatDateTimeByType } from "../formatDateTimeByType"; // adjust the import path
import dayjs from "dayjs";
import { describe, it, expect } from "vitest";
describe("formatDateTimeByType", () => {
  const sampleDateTime = "2025-04-21T14:45:00Z";

  it("should return formatted date and time when type is 'both'", () => {
    const result = formatDateTimeByType(sampleDateTime, "both");
    const expected = `${dayjs(sampleDateTime).format("YYYY/MM/DD")} - ${dayjs(
      sampleDateTime
    ).format("hh.mm A")}`;
    expect(result).toBe(expected);
  });

  it("should return formatted date only when type is 'date'", () => {
    const result = formatDateTimeByType(sampleDateTime, "date");
    const expected = dayjs(sampleDateTime).format("YYYY/MM/DD");
    expect(result).toBe(expected);
  });

  it("should return formatted time only when type is 'time'", () => {
    const result = formatDateTimeByType(sampleDateTime, "time");
    const expected = dayjs(sampleDateTime).format("hh.mm A");
    expect(result).toBe(expected);
  });

  it("should default to 'both' if no type is provided", () => {
    const result = formatDateTimeByType(sampleDateTime);
    const expected = `${dayjs(sampleDateTime).format("YYYY/MM/DD")} - ${dayjs(
      sampleDateTime
    ).format("hh.mm A")}`;
    expect(result).toBe(expected);
  });

  it("should return fallback string if input is null", () => {
    const result = formatDateTimeByType(null, "both");
    expect(result).toBe("Date: N/A -Time: N/A");
  });

  it("should return fallback string if input is undefined", () => {
    const result = formatDateTimeByType(undefined, "both");
    expect(result).toBe("Date: N/A -Time: N/A");
  });
  it("should return fallback string if input is random string", () => {
    const result = formatDateTimeByType("sdas", "both");
    expect(result).toBe("Date: N/A -Time: N/A");
  });
});
