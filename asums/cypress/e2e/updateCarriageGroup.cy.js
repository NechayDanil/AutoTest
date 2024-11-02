beforeEach(() => {
    cy.fixture('users').as('users');
    cy.fixture('carageGroup').as('carageGroup');
    cy.visit(Cypress.env('carageGroup'));
})
it('updateCarriageGroup', function () {
    cy.login();
    cy.visit(Cypress.env('carageGroup'))
    cy.get('[data-testid="MoreVertIcon"]').eq(0).click();
    cy.contains('Редактировать').should('be.visible').click();
    cy.get('[data-testid="addTurnover"]').click();
    cy.get('[data-testid="train"]').type(this.carageGroup.addCoreGroupNps.addTrainFrom);
    cy.contains(this.carageGroup.addCoreGroupNps.addTrainFrom).should('be.visible').click();
    cy.get('[data-testid="groupSign"]').click();
    cy.get('[data-value="carriage_group_sign.o"]').should('be.visible').click();
    cy.get('[data-testid="schemas"]').click();
    cy.contains(this.carageGroup.addCoreGroupNps.addShema1).should('be.visible').click();
    cy.contains(this.carageGroup.addCoreGroupNps.addShema2).should('be.visible').click();
    cy.get('[data-testid="stationFrom"]').type(this.carageGroup.addCoreGroupNps.stationFrom);
    cy.contains(this.carageGroup.addCoreGroupNps.stationFrom).should('be.visible').click();
    cy.get('[data-testid="stationTo"]').type(this.carageGroup.addCoreGroupNps.stationTo);
    cy.contains(this.carageGroup.addCoreGroupNps.stationTo).should('be.visible').click();
    cy.get('[data-testid="saveform-turnover"]').click();
    cy.get('[data-testid="addTurnover"]').click();
    cy.get('[data-testid="train"]').type(this.carageGroup.addCoreGroupNps.addTrainTo);
    cy.contains(this.carageGroup.addCoreGroupNps.addTrainTo).should('be.visible').click();
    cy.get('[data-testid="groupSign"]').click();
    cy.get('[data-value="carriage_group_sign.o"]').should('be.visible').click();
    cy.get('[data-testid="schemas"]').click();
    cy.contains('[role="option"]', this.carageGroup.addCoreGroupNps.addShema1).should('be.visible').click();
    cy.contains('[role="option"]', this.carageGroup.addCoreGroupNps.addShema2).should('be.visible').click();
    cy.get('[data-testid="stationFrom"]').type(this.carageGroup.addCoreGroupNps.stationTo);
    cy.contains('[role="option"]', this.carageGroup.addCoreGroupNps.stationTo).should('be.visible').click();
    cy.get('[data-testid="stationTo"]').type(this.carageGroup.addCoreGroupNps.stationFrom);
    cy.contains('[role="option"]', this.carageGroup.addCoreGroupNps.stationFrom).should('be.visible').click();
    cy.get('[data-testid="saveform-turnover"]').click();
    cy.get('[data-testid="addPeriodicity"]').click();
    cy.get('[data-testid="dateFrom"]').type(this.carageGroup.addCoreGroupNps.dateFrom);
    cy.get('[data-testid="dateTo"]').type(this.carageGroup.addCoreGroupNps.dateTo);
    cy.get('[data-testid="periodicity"]').click();
    cy.get('[data-value="periodicity.daily"]').should('be.visible').click();
    cy.get('[data-testid="savePeriodicity"]').click();
});




