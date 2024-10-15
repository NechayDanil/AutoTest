beforeEach(() => {
    cy.fixture('users.json').as('users')
    cy.fixture('classy.json').as('classy')
    cy.visit(Cypress.env('host'));
})
it("StationsTestList" , function () {
    cy.intercept('POST', Cypress.env('API_URL'), (req) => {
        if (req.body.operationName === 'stationsList') {
            req.alias = 'operationList';
        }
    });
    cy.login();
    cy.visit(Cypress.env('station'));
    cy.wait('@operationList').its('response.body.data.classifiers.station.list.totalCount').then((totalCount) => {
        expect(totalCount).to.exist;
        cy.log(`Total Count: ${totalCount}`);
    });

})

it('CreateTestStation', function () {
    cy.intercept('POST', Cypress.env('API_URL'), (req) => {
        if (req.body.operationName === 'stationsCreate') {
            req.alias = 'operationCreate';
        }
    })
    cy.login();
    cy.visit(Cypress.env('station'));
    cy.get('[data-testid="Station.add"]').click();
    cy.get('[data-testid="Station.dialog.form.fullName"]').type('ТестАвто');
    cy.get('[data-testid="Station.dialog.form.railway"]').eq(0).click();
    cy.contains(this.classy.stations.railwayName).should('be.visible').click()

});
