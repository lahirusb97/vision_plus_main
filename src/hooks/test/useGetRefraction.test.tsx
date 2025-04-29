import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useGetRefraction from "../useGetRefraction";
import axiosClient from "../../axiosClient";
import { getUserCurentBranch } from "../../utils/authDataConver";
import axios from "axios";

// Mock axios client and auth utils
vi.mock("../../axiosClient");
vi.mock("../../utils/authDataConver");

describe("useGetRefraction", () => {
  const mockBranchId = 1;
  const mockResponse = {
    data: {
      results: [],
      count: 0,
    },
  };

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    (getUserCurentBranch as Mock).mockReturnValue({ id: mockBranchId });
    (axiosClient.get as Mock).mockResolvedValue(mockResponse);
  });

  it("should cancel previous request when changing page", async () => {
    const { result } = renderHook(() => useGetRefraction());

    // Initial request
    await act(async () => {
      result.current.refractionPageNavigation(1);
    });

    // Change page - should cancel previous request
    await act(async () => {
      result.current.refractionPageNavigation(2);
    });

    // Verify that axios.get was called twice
    expect(axiosClient.get).toHaveBeenCalledTimes(2);

    // Verify the second call has the new page number
    expect(axiosClient.get).toHaveBeenLastCalledWith(
      "refractions/",
      expect.objectContaining({
        params: expect.objectContaining({
          page: 2,
          branch_id: mockBranchId,
        }),
      })
    );
  });

  it("should cancel previous request when changing search query", async () => {
    const { result } = renderHook(() => useGetRefraction());

    // Initial request
    await act(async () => {
      result.current.handleRefractionSearch("");
    });

    // Change search query - should cancel previous request
    await act(async () => {
      result.current.handleRefractionSearch("test");
    });

    // Verify that axios.get was called twice
    expect(axiosClient.get).toHaveBeenCalledTimes(2);

    // Verify the second call has the new search query
    expect(axiosClient.get).toHaveBeenLastCalledWith(
      "refractions/",
      expect.objectContaining({
        params: expect.objectContaining({
          search: "test",
          branch_id: mockBranchId,
        }),
      })
    );
  });

  it("should handle request cancellation gracefully", async () => {
    //!axios.CancelToken.source(); out dated dont use it
    const cancelTokenSource = axios.CancelToken.source();
    cancelTokenSource.cancel("Request canceled");
    const mockCancelError = new axios.Cancel("Request canceled");

    // Mock axios.isCancel to return true for our error
    vi.spyOn(axios, "isCancel").mockImplementationOnce(() => true);

    // Mock the API to reject with our cancel error
    (axiosClient.get as Mock).mockRejectedValueOnce(mockCancelError);

    const { result } = renderHook(() => useGetRefraction());

    await act(async () => {
      result.current.refractionPageNavigation(2);
    });

    // Verify that loading is reset to false
    expect(result.current.refractionLoading).toBe(false);

    // Verify that the error state is not set for cancelled requests
    expect(result.current.refractionsListerror).toBe(false);

    // Verify that data is not cleared on cancellation
    expect(result.current.refractionsList).toEqual([]);
  });
});
