import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import Header from "../src/components/Header";

describe("Header Component", () => {
  it("will test the basic structure of the Header", () => {
    const header = TestRenderer.create(
      <MemoryRouter>
        <Header />
      </MemoryRouter>).toJSON();

    const [h1] = header.children;
    const [h1Text] = h1.children;

    expect(header.type).toBe("nav");
    expect(h1.type).toBe("h1");
    expect(h1Text).toBe("POKEDEX");
  });
});
