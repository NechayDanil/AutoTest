beforeEach(() => {
    //cy.fixture('body.json').as('body');
    cy.fixture('users.json').as('users')
    cy.visit(Cypress.env('host'));
})
it("Тест" , function () {
    cy.intercept('POST', Cypress.env('API_URL'), (req) => {
        if (req.body.operationName === 'stationsList') {
            req.alias = 'specificOperation';
        }
    });
    cy.login();
    cy.visit(Cypress.env('station'));
    cy.wait('@specificOperation').its('response.body.data.classifiers.station.list.totalCount').then((totalCount) => {
        expect(totalCount).to.exist;
        cy.log(`Total Count: ${totalCount}`);
    });

})
