describe("Test 5", () => {
  it("will test that the basic structure of the Pokemon page", () => {
    cy.visit('/pokemon/bulbasaur');

    // wait 1 second for api call to complete
    cy.wait(1000);


    cy.get('h2')
      .should("contain.text", "bulbasaur");

    cy.get('.pokemon-card').should('exist');

    cy.get('.pokemon-card h3').should('contain.text', "bulbasaur");

    cy.get('.pokemon-card > img')
      .invoke('attr', 'src')
      .should('eq', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');

    cy.get('.pokemon-card > .moves-grid > div')
      .should("have.length", 4);

    // will need to manually check for 2x2 if desired

    cy.get('.pokemon-card > button')
      .should("have.text", 'Catch');




  });
});

