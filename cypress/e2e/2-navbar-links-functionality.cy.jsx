describe("Test 2", () => {
  it("can navigate to Team page, then back to Home page", () => {
    cy.visit('/');

    cy.get("[href='/team']")
      .click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/team');
    });

    cy.get("[href='/']")
      .click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/');
    });
  });
});