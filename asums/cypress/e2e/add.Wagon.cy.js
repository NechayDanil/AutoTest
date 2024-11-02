beforeEach(() => {
    cy.fixture('users').as('users');
    cy.fixture('carageGroup').as('carageGroup');
    cy.visit(Cypress.env('carageGroup'));
})
it('updateCarriageGroup', function () {
    cy.intercept('POST', Cypress.env('API_URL'), (req) => {
        if (req.body.operationName === 'addCarriageNps') {
            req.alias = 'addCarriageNps';
        }
    })
    cy.login();
    cy.visit(Cypress.env('carageGroup'))
    cy.get('[data-testid="MoreVertIcon"]').eq(0).click();
    cy.contains('Редактировать').should('be.visible').click();
    cy.get('[data-testid="addWagon"]').click();
    cy.get('[data-testid="carriageType"]').type(this.carageGroup.addCoreGroupNps.carriageType);
    cy.wait(2000);
    cy.contains('[role="option"]', this.carageGroup.addCoreGroupNps.carriageType).should('be.visible').click();
    cy.get('[data-testid="carriageDimension"]').type(this.carageGroup.addCoreGroupNps.carriageDimension);
    cy.contains(this.carageGroup.addCoreGroupNps.carriageDimension).should('be.visible').click();
    cy.get('[data-testid="brakeType"]').type(this.carageGroup.addCoreGroupNps.brakeType);
    cy.contains(this.carageGroup.addCoreGroupNps.brakeType).should('be.visible').click();
    cy.get('[data-testid="carriageLength"]').type(this.carageGroup.addCoreGroupNps.carriageLength);
    cy.contains(this.carageGroup.addCoreGroupNps.carriageLength).should('be.visible').click();
    cy.get('[data-testid="airConditioner"]').click();
    cy.get('[data-value="0"]').should('be.visible').click();
    cy.get('[data-testid="ecoToilets"]').click();
    cy.get('[data-value="1"]').should('be.visible').click();
    cy.get('[data-testid="carriageTypeAsu"]').type(this.carageGroup.addCoreGroupNps.carriageTypeAsu);
    cy.contains(this.carageGroup.addCoreGroupNps.carriageTypeAsu).should('be.visible').click();
    cy.get('[data-testid="carriageModel"]').type(this.carageGroup.addCoreGroupNps.carriageModel);
    cy.contains(this.carageGroup.addCoreGroupNps.carriageModel).should('be.visible').click();
    cy.get('[data-testid="heatType"]').type(this.carageGroup.addCoreGroupNps.heatType);
    cy.contains(this.carageGroup.addCoreGroupNps.heatType).should('be.visible').click();
    cy.get('[data-testid="seatsQuantity"]').type(this.carageGroup.addCoreGroupNps.seatsQuantity);
    cy.get('[data-testid="centralizedPowerSupply"]').click();
    cy.get('[data-value="1"]').should('be.visible').click();
    cy.get('[data-testid="next"]').click();
    cy.wait('@addCarriageNps').its('response.body.data.carriageGroups.addCarriageNps').then((add) => {
        expect(add).to.exist;
    });

});