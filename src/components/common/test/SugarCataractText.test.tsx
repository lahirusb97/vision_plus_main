import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SugarCataractText from "../SugarCataractText";

describe("SugarCataractText", () => {
  it("renders nothing when both props are false or undefined", () => {
    const { container } = render(
      <SugarCataractText shuger={false} cataract={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders only 'Sugar' when shuger is true", () => {
    render(<SugarCataractText shuger={true} cataract={false} />);
    expect(screen.getByText("Sugar")).toBeInTheDocument();
  });

  it("renders only 'Cataract' when cataract is true", () => {
    render(<SugarCataractText shuger={false} cataract={true} />);
    expect(screen.getByText("Cataract")).toBeInTheDocument();
  });

  it("renders 'Sugar | Cataract' when both are true", () => {
    render(<SugarCataractText shuger={true} cataract={true} />);
    expect(screen.getByText("Sugar | Cataract")).toBeInTheDocument();
  });
});
