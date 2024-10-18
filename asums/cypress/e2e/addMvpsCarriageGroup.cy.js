beforeEach(() => {
    cy.fixture('users').as('users');
    cy.fixture('carageGroup').as('carageGroup');
    cy.visit(Cypress.env('carageGroup'));
})
it('addCarageGroup', function () {
    cy.intercept('POST', Cypress.env('API_URL'), (req) => {
        if (req.body.operationName === 'createCarriageGroup') {
            req.alias = 'createCarriageGroup';
        }
    });
    cy.login();
    cy.visit(Cypress.env('carageGroup'));
    cy.get('[data-testid="addWagonGroup"]').click();
    cy.get('[data-testid="name"]').type(this.carageGroup.addMvps.nameGroup);
    cy.get('[data-testid="rollingStockTypeMvps"]').click();
    cy.get('[data-testid="autocomplete-railway-administration"]').click();
    cy.contains(this.carageGroup.addMvps.nameRoelway).should('be.visible').click();
    cy.get('[data-testid="autocomplete-passenger-carriers"]').click();
    cy.contains(this.carageGroup.addMvps.nameCarier).should('be.visible').click();
    cy.get('[data-testid="autocomplete-branch"]').click();
    cy.contains(this.carageGroup.addMvps.nameBranch).should('be.visible').click();
    cy.get('[data-testid="autocomplete-structural-subdivision"]').click();
    cy.contains(this.carageGroup.addMvps.nameRegistered).should('be.visible').click();
    cy.get('[data-testid="saveWagonGroup"]').click();
    cy.wait('@createCarriageGroup').its('response.body.data.carriageGroups.createCarriageGroup').then((createCarriageGroup) => {
        expect(createCarriageGroup).to.exist;
    });

});

