beforeEach(() => {
    cy.fixture('users').as('users');
    cy.fixture('carageGroup').as('carageGroup');
    cy.visit(Cypress.env('carageGroup'));
})
it('delCarriageGroup', function () {
    cy.intercept('POST', Cypress.env('API_URL'), (req) => {
        if (req.body.operationName === 'deleteCarriageGroup') {
            req.alias = 'deleteCarriageGroup';
        }
    });
    cy.login();
    //cy.visit(Cypress.env('carageGroup'));
    cy.get('[data-testid="MoreVertIcon"]').eq(0).click();
cy.contains('Удалить').should('be.visible').click();
cy.contains('Да').should('be.visible').click();
cy.wait('@deleteCarriageGroup').its('response.body.data.carriageGroups.deleteCarriageGroup').then((deleteCarriageGroup) => {
    expect(deleteCarriageGroup).to.be.true;
})
});




