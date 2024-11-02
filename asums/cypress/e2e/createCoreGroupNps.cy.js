beforeEach( () => {
    cy.fixture('users').as('users');
    cy.fixture('carageGroup').as('carageGroup');
    cy.visit(Cypress.env('carageGroup'));
})

/**
 * @description Тест для проверки добавления оборотки, переодичности, вагонов группы вагонов НПС
 * {@link }
 */

it ('addParametersGroup', function() {
    cy.login();
    cy.visit(Cypress.env('carageGroup'));
    cy.get(':nth-child(1) > .32-11kpd8a > .MuiButtonBase-root').click();
    cy.contains('Редактировать').click();
    cy.get('[data-testid="addTurnover"]').click();
    cy.get('[data-testid="train"]').type(this.carageGroup.addCoreGroupNps.addTrain);
    cy.contains(this.carageGroup.addCoreGroupNps.addTrain).click();
    cy.get('[data-testid="groupSign"]').click();
    cy.get('[data-value="carriage_group_sign.o"]').click();
})