import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useGetExternalLenses } from "../useGetExternalLenses";
import axiosClient from "../../axiosClient";
interface FilterParams {
  lens_type?: string | null | undefined;
  coating?: string | null | undefined;
  brand?: string | null | undefined;
}
vi.mock("../../axiosClient", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock("../utils/extractErrorMessage", () => ({
  extractErrorMessage: vi.fn(),
}));

const mockData = {
  results: [
    {
      id: 1,
      lens_type: 2,
      lens_type_name: "Single Vision",
      coating: 1,
      coating_name: "Anti-Glare",
      brand: 3,
      brand_name: "Essilor",
      branded: "1",
      branded_display: "Branded",
      price: "5000",
      branch: null,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
    },
  ],
  available_filters: {
    lens_types: [1, 2],
    coatings: [1],
    branded: "1",
    brands: [3],
  },
};

describe("useGetExternalLenses", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetches data with all 3 valid params", async () => {
    vi.spyOn(axiosClient, "get").mockResolvedValue({ data: mockData });

    const { result } = renderHook(() =>
      useGetExternalLenses({ lens_type: "2", coating: "1", brand: "3" })
    );

    expect(result.current.externaLenseListLoading).toBe(true);
    expect(result.current.externaLenseList).toBeNull();
    expect(result.current.externaLenseListError).toBe(false);

    await waitFor(() => result.current.externaLenseListLoading === false);

    expect(result.current.externaLenseList).toEqual(mockData);
    expect(result.current.externaLenseListError).toBe(false);
    expect(axiosClient.get).toHaveBeenCalledWith("external_lenses", {
      params: { lens_type: "2", coating: "1", brand: "3" },
    });
  });
  it("fetches data with all invalid params", async () => {
    vi.spyOn(axiosClient, "get").mockResolvedValue({ data: mockData });

    const { result } = renderHook(() =>
      useGetExternalLenses({ lens_type: null, coating: null, brand: undefined })
    );

    expect(result.current.externaLenseListLoading).toBe(true);
    expect(result.current.externaLenseList).toBeNull();
    expect(result.current.externaLenseListError).toBe(false);

    await waitFor(() => result.current.externaLenseListLoading === false);

    expect(result.current.externaLenseList).toEqual(mockData);
    expect(result.current.externaLenseListError).toBe(false);
    expect(axiosClient.get).toHaveBeenCalledWith("external_lenses", {
      params: {},
    });
  });

  it("refetches when params change", async () => {
    const mockGet = vi.mocked(axiosClient.get);
    mockGet.mockResolvedValueOnce({ data: mockData });

    const initialParams: FilterParams = {
      lens_type: "2",
      coating: "1",
      brand: "3",
    };

    const { result, rerender } = renderHook(
      (props: FilterParams) => useGetExternalLenses(props),
      { initialProps: initialParams }
    );

    await waitFor(() => result.current.externaLenseListLoading === false);
    expect(mockGet).toHaveBeenCalledWith("external_lenses", {
      params: initialParams,
    });

    const updatedParams: FilterParams = {
      lens_type: null,
      coating: "1",
      brand: "3",
    };

    mockGet.mockResolvedValueOnce({ data: mockData });
    rerender(updatedParams);

    await waitFor(() => result.current.externaLenseListLoading === false);
    expect(mockGet).toHaveBeenCalledWith("external_lenses", {
      params: { coating: "1", brand: "3" },
    });
  });
  describe("useGetExternalLenses", () => {
    it("should not run infinitely with empty params", () => {
      const { result } = renderHook(() => useGetExternalLenses({}));
      // If this test times out, there's an infinite loop
      expect(result.current.externaLenseListLoading).toBe(true);
    });
  });
});
