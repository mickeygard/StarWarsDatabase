describe("Test 1", () => {
  it("will test the structure of the navbar", () => {
    cy.visit("/");

    cy.get("nav").should("exist");

    cy.get("nav h1").should("have.text", "POKEDEX");

    cy.get("nav a")
      .eq(0) // index-0
      .should("have.text", "Home")
      .should("have.attr", "href", "/");

    cy.get("nav a")
      .eq(1) // index-1
      .should("have.text", "My Team #0")
      .should("have.attr", "href", "/team");

    cy.get("nav input").should("have.attr", "placeholder", "search");

    cy.get("nav button").should("have.text", "Search");
  });
});
