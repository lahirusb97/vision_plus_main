import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { BrowserRouter } from "react-router";
import LenseFullEdit from "./LenseFullEdit";

// Mock hooks with Vitest
vi.mock("../../../hooks/lense/useGetLenseType", () => ({
  default: () => ({
    lenseTypes: [
      { id: 1, name: "Single" },
      { id: 2, name: "Progressive" },
    ],
    lenseTypesLoading: false,
  }),
}));
vi.mock("../../../hooks/lense/useGetBrand", () => ({
  default: () => ({ brands: [{ id: 10, name: "Acme" }], brandsLoading: false }),
}));
vi.mock("../../../hooks/lense/useGetCoatings", () => ({
  default: () => ({
    coatings: [{ id: 20, name: "AR" }],
    coatingsLoading: false,
  }),
}));
vi.mock("../../../hooks/lense/useGetSingleLense", () => ({
  default: () => ({
    singleLense: null,
    singleLenseLoading: false,
    singleLenseError: null,
  }),
}));

describe("LenseFullEdit component (Vitest)", () => {
  beforeEach(() => {
    // ensure clean DOM
  });

  afterEach(() => {
    cleanup();
  });

  it("renders title and fields correctly", async () => {
    render(
      <BrowserRouter>
        <LenseFullEdit />
      </BrowserRouter>
    );
    expect(screen.getByText(/Lens Full Edit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Factory/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Lense Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Lense Type/i)).toBeInTheDocument();
  });

  it("single vision type shows SPH and CYL buttons only", async () => {
    render(
      <BrowserRouter>
        <LenseFullEdit />
      </BrowserRouter>
    );
    // open type selector
    fireEvent.mouseDown(screen.getAllByRole("combobox")[1]);
    await waitFor(() => screen.getByText("Single"));
    fireEvent.click(screen.getByText("Single"));

    expect(screen.getByRole("button", { name: "SPH" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CYL" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "ADD" })).toBeNull();
  });

  it("progressive type shows SPH and ADD buttons only", async () => {
    render(
      <BrowserRouter>
        <LenseFullEdit />
      </BrowserRouter>
    );
    fireEvent.mouseDown(screen.getAllByRole("combobox")[1]);
    await waitFor(() => screen.getByText("Progressive"));
    fireEvent.click(screen.getByText("Progressive"));

    expect(screen.getByRole("button", { name: "SPH" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "CYL" })).toBeNull();
    expect(screen.getByRole("button", { name: "ADD" })).toBeInTheDocument();
  });

  it("can add and remove a power entry", async () => {
    render(
      <BrowserRouter>
        <LenseFullEdit />
      </BrowserRouter>
    );
    fireEvent.mouseDown(screen.getAllByRole("combobox")[1]);
    await waitFor(() => screen.getByText("Single"));
    fireEvent.click(screen.getByText("Single"));

    fireEvent.click(screen.getByRole("button", { name: "SPH" }));
    expect(screen.getByLabelText("SPH")).toBeInTheDocument();

    const deleteBtn = screen.getByTestId("delete-sph");
    fireEvent.click(deleteBtn);
    await waitFor(() =>
      expect(screen.queryByLabelText("SPH")).not.toBeInTheDocument()
    );
  });
});
