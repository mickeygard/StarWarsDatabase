import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import Header from "../src/components/Header";

describe("Header.jsx", () => {
  it("will test components in Header.jsx", () => {
    const header = TestRenderer.create(
      <MemoryRouter>
        <Header teamCount={3} />
      </MemoryRouter>
    ).toJSON();

    const [h1, homeLink, teamLink] = header.children;
    const [h1Text] = h1.children;
    const [homeLinkText] = homeLink.children;
    const [teamLinkText] = teamLink.children;


    console.log(teamLink)

    // expect root element <nav>
    expect(header.type).toBe("nav");
    // expect first child: <h1>POKEDEX</h1>
    expect(h1.type).toBe("h1");
    expect(h1Text).toBe("POKEDEX");
    // expect second child: <a href="/">Home</a>
    expect(homeLink.type).toBe("a");
    expect(homeLink.props).toHaveProperty("href", "/");
    expect(homeLinkText).toBe("Home");
    // expect third child: <a href="/team" onClick={...}>Home</a>
    expect(teamLink.type).toBe("a");
    expect(teamLink.props).toHaveProperty("href", "/team");
    expect(teamLinkText).toBe("My Team #3");
    // Form to look for pokemon
    expect(header.children[3].type).toBe("form");
    expect("onSubmit" in header.children[3].props).toBe(true);
    expect(header.children[3].children[0].type).toBe("input");
    expect(header.children[3].children[0].props.placeholder).toBe("search");
    expect(header.children[3].children[1].type).toBe("button");
    expect(header.children[3].children[1].children[0]).toBe("Search");
  });
});
