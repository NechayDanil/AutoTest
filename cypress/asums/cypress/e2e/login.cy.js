describe ("Тест логина", function () {
    it("Переход на сайт", function () {
        cy.visit("https://asumspreprod-client.promit-ek.ru/");
        cy.get('[data-testid="userName"]').type("admin");
        cy.get('[data-testid="password"]').type("pa$$w0rd!");
        cy.get('[data-testid="submit"]').click();

    })
})
