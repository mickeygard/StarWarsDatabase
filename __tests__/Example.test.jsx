import { describe, it, expect } from "vitest";
import TestRenderer from "react-test-renderer";
import Header from "../src/components/Header";

describe("Header Component", () => {
  it("will test the basic structure of Header", () => {
    const header = TestRenderer.create(<Header />).toJSON();

    expect(header.type).toBe("nav");
    expect(header.children[0].type).toBe("h1");
    expect(header.children[0].children[0]).toBe("POKEDEX");
  });
});
