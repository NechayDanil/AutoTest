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

});

it('CreateTestStation', function () {
    cy.intercept('POST', Cypress.env('API_URL'), (req) => {
        if (req.body.operationName === 'stationCreate') {
            req.alias = 'stationCreate';
        }
    });
    cy.login();
    cy.visit(Cypress.env('station'));
    cy.get('[data-testid="Station.add"]').click();
    cy.get('[data-testid="Station.dialog.form.fullName"]').type(this.classy.stations.name);
    cy.get('[data-testid="Station.dialog.form.railway"]').eq(0).click();
    cy.contains(this.classy.stations.railwayName).should('be.visible').click();
    cy.get('[data-testid="Station.dialog.form.expressCode"]').type(this.classy.stations.expressCod);
    cy.contains('Сохранить').click();
    cy.wait('@stationCreate').its('response.body.data.classifiers.station.create').then((create) => {
        expect(create).to.exist;
    });

});


it('UpdateTestStation', function () {
    cy.intercept('POST', Cypress.env('API_URL'), (req) => {
        if(req.body.operationName === 'stationUpdate') {
            req.alias = 'stationUpdate';
        }
    });
    cy.login();
    cy.visit(Cypress.env('station'));
    cy.get('[data-testid="Station.search"]').type(this.classy.stations.name);
    cy.wait(3000);
    cy.get('[data-testid="MoreVertIcon"]').click();
    cy.contains('Редактировать').click();
    cy.get('[data-testid="Station.dialog.form.comment"]').type(this.classy.stations.comment);
    cy.contains('Сохранить').click();
    cy.wait('@stationUpdate').its('response.body.data.classifiers.station.update').then((update) => {
        expect(update).to.be.true;
    });

});
