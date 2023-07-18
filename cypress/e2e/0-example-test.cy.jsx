describe("Test 0", () => {
  it("will test the basic structure of the Navbar", () => {
    cy.visit("/");

    cy.get("nav").should("exist");

    cy.get("nav > h1").should("have.text", "POKEDEX");
  });
});

// // unpack children from root element
// const [h1] = navbar.children;

// // expect root element <nav>
// expect(navbar.type).toBe("nav");

// // expect first child: <h1>POKEDEX</h1>
// expect(h1.type).toBe("h1");
// expect(h1.children[0]).toBe("POKEDEX");
