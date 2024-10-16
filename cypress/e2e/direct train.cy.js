///<reference types='cypress'/>

beforeEach(() => {
    cy.fixture('trains.json').as('trains');
    cy.fixture('users.json').as('users')
})

/**
 * @description Тест для проверки добавления поезда прямого направления
 * {@link https://app.qase.io/case/ASUMS-3}
 */

it('Add direct train', function() {
    cy.intercept('POST', `${Cypress.env('API_URL')}/train-heads`).as('saveTrain');
    cy.login();
    cy.visit(Cypress.env('train-list'));
    cy.get('[data-testid="createTrain"]').click();
    cy.get('[data-testid="showPair"]').click();
    cy.get('[data-testid="trainNumber"]').eq(0).type(this.trains.direct.trainNumber);
    cy.get('[data-testid="stationFrom"]').eq(0).type(this.trains.direct.stationFrom);
    cy.contains(this.trains.direct.stationFrom).click();
    cy.get('[data-testid="stationTo"]').eq(0).type(this.trains.direct.stationTo);
    cy.contains(this.trains.direct.stationTo).click();
    cy.get('[data-testid="individualName"]').eq(0).type(this.trains.direct.individualName);
    cy.get('[data-testid="dateFromDate"]').eq(0).type(this.trains.direct.dateFromDate);
    cy.get('[data-testid="dateFromTime"]').eq(0).type(this.trains.direct.dateFromTime);
    cy.get('[data-testid="dateToDate"]').eq(0).type(this.trains.direct.dateToDate);
    cy.get('[data-testid="dateToTime"]').eq(0).type(this.trains.direct.dateToTime);
    cy.get('[data-testid="railwayAdministration"]').eq(0).click();
    cy.contains(this.trains.direct.railwayAdministration).click();
    cy.get('[data-testid="passengerCarriersRussianRailway"]').eq(0).click();
    cy.contains(this.trains.direct.passengerCarriersRussianRailway).click();
    cy.get('[data-testid="branch"]').eq(0).click();
    cy.contains(this.trains.direct.branch).click();
    cy.get('[data-testid="trainBrand"]').eq(0).click();
    cy.contains(this.trains.direct.trainBrand).click;
    cy.get('[data-testid="periodicity"]').eq(0).click();
    cy.contains(this.trains.direct.periodicity).click();
    cy.get('[data-testid="periodicitySeason"]').eq(0).click();
    cy.contains(this.trains.direct.periodicitySeason).click();
    cy.get('[data-testid="maxTrainSpeed"]').eq(0).click();
    cy.contains(this.trains.direct.maxTrainSpeed).click();
    cy.get('[data-testid="saveTrain"]').click();
    cy.wait('@saveTrain').its('response.statusCode').should('eq', 201);
    cy.contains("Информация о поезде успешно сохранена").should('be.visible');
});

