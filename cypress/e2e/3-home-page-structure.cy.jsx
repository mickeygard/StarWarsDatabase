describe("Test 3", () => {
  it("will test the basic structure of the Home Page", () => {
    cy.visit('/');

    cy.get('h2')
      .should("contain.text", "Home");

    // wait 1 second for api call to complete
    cy.wait(1000);

    cy.get('ol > li')
      .should("have.length", 30);

    cy.get('ol > li > a')
      .first()
      .should("have.text", "bulbasaur")
      .invoke('attr', 'href')
      .should('eq', '/pokemon/bulbasaur');
  });
});

