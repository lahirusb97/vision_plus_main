import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SugarCataractText from "../SugarCataractText";

describe("SugarCataractText", () => {
  it("renders no labels when all props are false", () => {
    const { container } = render(
      <SugarCataractText shuger={false} cataract={false} blepharitis={false} />
    );
    // No text should be rendered
    expect(container.textContent).toBe("");
  });

  it.each([
    ["Sugar", { shuger: true, cataract: false, blepharitis: false }],
    ["Cataract", { shuger: false, cataract: true, blepharitis: false }],
    ["Blepharitis", { shuger: false, cataract: false, blepharitis: true }],
  ])("renders only '%s' when only %s is true", (label, props) => {
    render(<SugarCataractText {...props} />);
    // The expected label should be in the document
    expect(screen.getByText(label)).toBeInTheDocument();
    // Other labels should not be present
    const others = ["Sugar", "Cataract", "Blepharitis"].filter(
      (l) => l !== label
    );
    others.forEach((other) => {
      expect(screen.queryByText(other)).toBeNull();
    });
  });

  it("renders all labels when all props are true", () => {
    render(
      <SugarCataractText shuger={true} cataract={true} blepharitis={true} />
    );
    ["Sugar", "Cataract", "Blepharitis"].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
