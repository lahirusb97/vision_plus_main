import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { vi, Mock } from "vitest"; // Explicit import
import { useGetExternalLenses } from "../useGetExternalLenses";
import axiosClient from "../../axiosClient";

vi.mock("../../axiosClient", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("useGetExternalLenses", () => {
  let abortSpy = vi.spyOn(AbortController.prototype, "abort");

  beforeEach(() => {
    // Spy on AbortController.prototype.abort to track calls to abort
    abortSpy = vi.spyOn(AbortController.prototype, "abort");

    // Mock axiosClient.get to simulate API calls
    (axiosClient.get as Mock).mockResolvedValue({ data: {} });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should cancel previous request when params change", async () => {
    const initialParams = { lens_type: 1 };
    const newParams = { lens_type: 2 };

    // Render the hook with initial params
    const { result } = renderHook(() => useGetExternalLenses(), {
      initialProps: initialParams,
    });

    // Trigger the first request (initialParams)
    await waitFor(() =>
      expect(result.current.externaLenseListLoading).toBe(true)
    );

    // Change the parameters to newParams (this should cancel the previous request)
    act(() => {
      result.current.setExternalLenseParams(newParams);
    });

    // Assert the abort method was called once when the parameters changed
    expect(abortSpy).toHaveBeenCalledTimes(1);

    // Ensure the new request is being processed
    await waitFor(() =>
      expect(result.current.externaLenseListLoading).toBe(true)
    );
  });
});
