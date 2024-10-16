beforeEach(() => {
    cy.fixture('users.json').as('users')
    cy.fixture('classy.json').as('classy')
    cy.visit(Cypress.env('host'));
});

it('railwayList ', function () {
    cy.intercept('POST', Cypress.env('API_URL'), (req) => {
        if (req.body.operationName === 'railways') {
            req.alias = 'railwayList';
        }
    });
    cy.login();
    cy.visit(Cypress.env('railway'));
    cy.wait('@railwayList').its('response.body.data.classifiers.railway.list.totalCount').then((totalCount) => {
        expect(totalCount).to.exist;
    });
});

it('railwayCreate', function () {
    cy.intercept('POST', Cypress.env('API_URL'), (req) => {
        if (req.body.operationName === 'createRailway') {
            req.alias = 'createRailway';
        }
    });
    cy.login();
    cy.visit(Cypress.env('railway'));
    cy.get('[data-testid="railway.add"]').click();
    cy.get('[data-testid="railway.dialog.form.name"]').type(this.classy.railway.name);
    cy.get('[data-testid="railway.dialog.form.shortName"]').type(this.classy.railway.shortName);
    cy.get('[data-testid="railway.dialog.form.code"]').type(this.classy.railway.code);
    cy.get('[data-testid="railway.dialog.form.railwayAdministration"]').click();
    cy.wait(2000);
    cy.contains(this.classy.railway.railwayAdmin).should('be.visible').click();
    cy.get('[data-testid="railway.dialog.submit"]').click();
    cy.wait('@createRailway').its('response.body.data.classifiers.railway.create').then((create) => {
        expect(create).to.exist;
    })
});

it ('railwayUpdate', function (){
    cy.intercept('POST', Cypress.env('API_URL'), (req) => {
        if (req.body.operationName === 'updateRailway') {
            req.alias = 'updateRailway';
        }
    });
    cy.login();
    cy.visit(Cypress.env('railway'));
    cy.get(':nth-child(1) > .CellLayout-container > .Content-content > .ResizingControl-root > .MuiButtonBase-root > .Title-title').click();
    cy.wait(3000);
    cy.get(':nth-child(1) > .css-11kpd8a > .MuiButtonBase-root').click();
    cy.contains('Редактировать').click();
    cy.get('[data-testid="railway.dialog.form.name"]').type(this.classy.railway.nameReform);
    cy.get('[data-testid="railway.dialog.submit"]').click();
    cy.wait('@updateRailway').its('response.body.data.classifiers.railway.update').then((update) => {
        expect(update).to.be.true;
    })

})