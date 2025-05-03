import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SugarCataractText from "../SugarCataractText";

describe("SugarCataractText", () => {
  it("renders nothing when both props are false or undefined", () => {
    const { container } = render(
      <SugarCataractText shuger={false} cataract={false} blepharitis={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders only 'Sugar' when shuger is true", () => {
    render(
      <SugarCataractText shuger={true} cataract={false} blepharitis={false} />
    );
    expect(screen.getByText("Sugar")).toBeInTheDocument();
  });

  it("renders only 'Cataract' when cataract is true", () => {
    render(
      <SugarCataractText shuger={false} cataract={true} blepharitis={false} />
    );
    expect(screen.getByText("Cataract")).toBeInTheDocument();
  });
  it("renders only 'Blepharitis' when blepharitis is true", () => {
    render(
      <SugarCataractText shuger={false} cataract={false} blepharitis={true} />
    );
    expect(screen.getByText("Blepharitis")).toBeInTheDocument();
  });

  it("renders 'Sugar | Cataract | Blepharitis' when both are true", () => {
    render(
      <SugarCataractText shuger={true} cataract={true} blepharitis={true} />
    );
    expect(
      screen.getByText("Sugar | Cataract | Blepharitis")
    ).toBeInTheDocument();
  });
});
