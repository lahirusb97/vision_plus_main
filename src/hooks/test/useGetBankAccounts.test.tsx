import { renderHook, waitFor } from "@testing-library/react";

import { vi, Mock } from "vitest";
import axiosClient from "../../axiosClient";
import { useGetBankAccounts } from "../useGetBankAccounts";

// Mock axiosClient
vi.mock("../../axiosClient");

describe("useGetBankAccounts", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch bank accounts successfully", async () => {
    // Mock a successful response
    const mockData = [{ id: 1, accountName: "Savings" }];
    (axiosClient.get as Mock).mockResolvedValue({ data: mockData });

    // Render the hook
    const { result } = renderHook(() => useGetBankAccounts());

    // Check initial state
    expect(result.current.bankAccountsListLoading).toBe(true);

    // Wait for the hook to resolve
    await waitFor(() => {
      expect(result.current.bankAccountsListLoading).toBe(false);
      expect(result.current.bankAccountsList).toEqual(mockData);
      expect(result.current.bankAccountsListError).toBe(false);
    });
  });

  it("should handle API error", async () => {
    // Mock a failed request
    (axiosClient.get as Mock).mockRejectedValue(new Error("Network Error"));

    // Render the hook
    const { result } = renderHook(() => useGetBankAccounts());

    // Check initial state
    expect(result.current.bankAccountsListLoading).toBe(true);

    // Wait for the hook to resolve
    await waitFor(() => {
      expect(result.current.bankAccountsListLoading).toBe(false);
      expect(result.current.bankAccountsList).toEqual([]);
      expect(result.current.bankAccountsListError).toBe(true);
    });
  });

  it("should abort request on unmount", async () => {
    // Mock a delayed response to test abort
    const mockData = [{ id: 1, accountName: "Savings" }];
    (axiosClient.get as Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: mockData }), 1000)
        )
    );

    // Render the hook and immediately unmount
    const { unmount } = renderHook(() => useGetBankAccounts());
    unmount();

    // Check if the request was aborted
    await waitFor(() => {
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      // Check if the signal was passed (abort controller works)
      expect(
        (axiosClient.get as jest.Mock).mock.calls[0][1].signal
      ).toBeDefined();
    });
  });
});
