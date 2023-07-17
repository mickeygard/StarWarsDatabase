describe("Test 1", () => {
  it("will test the basic structure of the Navbar", () => {
    cy.visit('/');

    cy.get('nav > h1')
      .should("contain.text", "POKEDEX");

    cy.get('nav > a')
      .eq(0)
      .should("contain.text", "Home")
      .invoke('attr', 'href')
      .should('eq', '/');

    cy.get('nav > a')
      .eq(1)
      .should("contain.text", "My Team #0")
      .invoke('attr', 'href')
      .should('eq', '/team');

    cy.get('nav > input')
      .invoke('attr', 'placeholder')
      .should('eq', 'search');

    cy.get('nav > button')
      .should("contain.text", "Search");
  });
});

