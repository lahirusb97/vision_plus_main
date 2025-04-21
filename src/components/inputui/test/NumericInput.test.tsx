import { render, fireEvent } from "@testing-library/react";
import NumericInput from "../NumericInput";
import { vi } from "vitest";
import { describe, it, expect } from "vitest";

describe("NumericInput - Allowed Input Characters", () => {
  it("allows numbers only", () => {
    const onChange = vi.fn();
    const { getByPlaceholderText } = render(
      <NumericInput
        inputLabel={"CYL"}
        name="cyl"
        onChange={onChange}
        placeholder="CYL"
      />
    );

    fireEvent.change(getByPlaceholderText("CYL"), {
      target: { value: "12345" },
    });
    expect(onChange).toHaveBeenCalledWith("12345");
  });
  it("text symbols not allowed", () => {
    const onChange = vi.fn();
    const { getByPlaceholderText } = render(
      <NumericInput
        name="cyl"
        inputLabel={"CYL"}
        onChange={onChange}
        placeholder="CYL"
      />
    );

    fireEvent.change(getByPlaceholderText("CYL"), {
      target: { value: "12345" },
    });
    expect(onChange).toHaveBeenCalledWith("12345");
  });

  it("allows + and - symbols", () => {
    const onChange = vi.fn();
    const { getByPlaceholderText } = render(
      <NumericInput
        name="cyl"
        inputLabel={"CYL"}
        onChange={onChange}
        placeholder="CYL"
      />
    );

    fireEvent.change(getByPlaceholderText("CYL"), {
      target: { value: "+-123" },
    });
    expect(onChange).toHaveBeenCalledWith("+-123");
  });

  it("allows decimals", () => {
    const onChange = vi.fn();
    const { getByPlaceholderText } = render(
      <NumericInput
        name="cyl"
        inputLabel={"CYL"}
        onChange={onChange}
        placeholder="CYL"
      />
    );

    fireEvent.change(getByPlaceholderText("CYL"), {
      target: { value: "-12.75" },
    });
    expect(onChange).toHaveBeenCalledWith("-12.75");
  });

  it("removes invalid characters (e.g. letters or symbols)", () => {
    const onChange = vi.fn();
    const { getByPlaceholderText } = render(
      <NumericInput
        name="cyl"
        inputLabel={"CYL"}
        onChange={onChange}
        placeholder="CYL"
      />
    );

    fireEvent.change(getByPlaceholderText("CYL"), {
      target: { value: "abc!@#12.5d+" },
    });
    expect(onChange).toHaveBeenCalledWith("12.5+");
  });
  it("converts null value prop to empty string", () => {
    // 1. Render the component with null value
    const { getByPlaceholderText } = render(
      <NumericInput
        name="cyl"
        inputLabel={"CYL"}
        value={null}
        placeholder="CYL"
      />
    );

    // 2. Get the input element
    const input = getByPlaceholderText("CYL") as HTMLInputElement;

    // 3. Verify it displays empty string
    expect(input.value).toBe("");

    // 4. Optional: Verify onChange isn't called with null
    const onChange = vi.fn();
    render(
      <NumericInput
        inputLabel={"CYL"}
        name="cyl"
        value={undefined}
        onChange={onChange}
        placeholder="CYL"
      />
    );
    expect(onChange).not.toHaveBeenCalled();
  });
});
