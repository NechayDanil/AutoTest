///<reference types='cypress'/>

beforeEach(() => {
    cy.fixture('users').as('users');
    cy.visit(Cypress.env('authorization_url'));
})

/**
 * @description Тест для проверки успешной авторизации пользователя
 * {@link https://app.qase.io/case/ASUMS-1}
 */

it('Success Auth', function() {
    cy.get('[data-testid="userName"]').type(this.users.validUser.name);
    cy.get('[data-testid="password"]').type(this.users.validUser.password);
    cy.get('.PrivateSwitchBase-input').click();
    cy.get('[data-testid="submit"]').click();
});

/**
 * @description Тест для проверки авторизации с невалидным логином
 * {@link https://app.qase.io/case/ASUMS-59}
 */

it('Try authorize with an invalid username', function() {
    cy.get('[data-testid="userName"]').type(this.users.invalidUser.name);
    cy.get('[data-testid="password"]').type(this.users.validUser.password);
    cy.get('[data-testid="submit"]').click();
    cy.wait(10000);
    cy.contains('Ошибка авторизации').should('be.visible');
});

/**
 * @description Тест для проверки авторизации с невалидным паролем
 * {@link https://app.qase.io/case/ASUMS-23}
 */

it('Try authorize with an invalid password', function() {
    cy.get('[data-testid="userName"]').type(this.users.validUser.name);
    cy.get('[data-testid="password"]').type(this.users.invalidUser.password);
    cy.get('[data-testid="submit"]').click();
    cy.contains('Ошибка авторизации').should('be.visible');
});

/**
 * * @description Тест для проверки авторизации с незаполненным паролем
 * {@link https://app.qase.io/case/ASUMS-60}
 */

it('Try authorize without a password', function() {
    cy.get('[data-testid="userName"]').type(this.users.validUser.name);
    cy.get('[data-testid="submit"]').click();
    cy.contains('Обязательно для заполнения').should('be.visible');
});

/**
 * * @description Тест для проверки попытки авторизации без учетных данных
 * {@link https://app.qase.io/case/ASUMS-311}
 */

it('Try authorize without credentials', function() {
    cy.get('.PrivateSwitchBase-input').click();
    cy.get('[data-testid="submit"]').click();
    cy.contains('Обязательно для заполнения').should('be.visible');
});

/**
 * * @description Тест для проверки авторизации с использованием LDAP
 * {@link https://app.qase.io/case/ASUMS-139}
 */

it('LDAP authorizing', function() {
   cy.get('[data-testid="userName"]').type(this.users.ldapUser.name);
    cy.get('[data-testid="password"]').type(this.users.ldapUser.password);
    cy.get('.PrivateSwitchBase-input').click();
    cy.get('[data-testid="submit"]').click();
});


// //asums-58 авторизация со старым паролем после смены пароля
// it('authorization after change password', () => {
//     // Аутентификация пользователя
//     cy.request({
//         method: 'POST',
//         url: 'https://asums.promit-ek.ru/auth/sign-in',
//         body: {
//             "userName": validUsername,
//             "password": validPassword,
//             "isLdapAuth": false
//         }
//     }).then((response) => {
//         const authToken = response.body.refreshToken;
//         const userName =  'user_111';
//         const password = 'Fylhtq1411!'

//         // Добавление пользователя
//         cy.request({
//             method: 'POST',
//             url: 'https://asums.promit-ek.ru/users',
//             body: {
//                 fullName: 'Тестовый Андрей Андреевич',
//                 personalNumber: 1111699,
//                 userName: userName,
//                 password: password,
//                 branchId: 1,
//                 roleIds: [
//                     1,
//                     2
//                 ],
//                 email: 'user_111@yandex.ru',
//                 jobPosition: 'Специалист',
//                 expirationDate: '2025-06-25',
//                 phoneNumber: '89999998999'
//             },
//             headers: {
//                 Authorization: `Bearer ${authToken}`
//             }
//         }).then((response) => {
//             const userId = response.body.id;
//             const newPassword = 'NewPassword123!';

//             // Изменение пароля пользователя
//             cy.request({
//                 method: 'PATCH',
//                 url: `https://asums.promit-ek.ru/users/${userId}`,
//                 body: {
//                     password: newPassword
//                 },
//                 headers: {
//                     Authorization: `Bearer ${authToken}`
//                 }
//             }).then((response) => {
//                 // Выполнение скрипта авторизации пользователя
//                 cy.visit('https://asums-client.promit-ek.ru/');
//                 cy.get('#\\:r0\\:').type(userName);
//                 cy.get('#\\:r1\\:').type(password);
//                 cy.get('.PrivateSwitchBase-input').click();
//                 cy.get('[data-testid="submit"]').click();
//                 cy.contains('Неправильный логин или пароль').should('be.visible');

//                 // Удаление пользователя
//                 cy.request({
//                     method: 'DELETE',
//                     url: `https://asums.promit-ek.ru/users/${userId}`,
//                     headers: {
//                         Authorization: `Bearer ${authToken}`
//                     }
//                 });
//             });
//         });
//     });
// });
