// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

function getUserId () {
    return window.localStorage.getItem('userId')
}

Cypress.Commands.add('login', () => {
    cy.fixture('users').then((users) => {
        const user = users.validUser;
        cy.request({
            method: 'POST',
            url: `${Cypress.env('API_URL')}`,
            headers: {'Content-Type': 'application/json','X-Token': 'healthcheck'},
            body: {
                query:
                    `mutation {
                        authentication {
                            signIn(data: {
                                user_name: "${user.name}"
                                password: "${user.password}"
                                isLdapAuth: false
                            }) {
                                refreshToken
                                accessTokenExpTimestamp
                            }
                        }
                    }`,
            },
        }).then(() => {});
    });
});

Cypress.Commands.add('logout', () => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}`,
        headers: {'Content-Type': 'application/json','X-Token': 'healthcheck'},
        body: {
            query:
                `mutation {
                    authentication {
                        singOut
                    }
                }`,
        },
    })
});

Cypress.Commands.add('createUser', () => {
    cy.fixture('users').then((users) => {
        const newUser = users.newUser;
        cy.request({
            method: 'POST',
            url: `${Cypress.env('API_URL')}`,
            headers: {'Content-Type': 'application/json','X-Token': 'healthcheck'},
            body: {
                query:
                    `mutation {
                        users   {
                            create(data: {
                                full_name: "${newUser.fullName}",
                                personal_number: "${newUser.personalNumber}", 
                                user_name: "${newUser.name}",
                                email:"${newUser.email}",
                                password: "${newUser.password}",
                                job_position: "${newUser.jobPosition}",
                                expiration_date: "${newUser.expirationDate}"
                                phone_number: "${newUser.phoneNumber}"
                                disabled: false
                                roleIds: [1]
                            }) {
                                id
                            }    
                        }
                    }`
            }
        }).then((response) => {
            const userId = response.body.data.users.create.id;
            window.localStorage.setItem('userId', userId);
        });
    });
});

Cypress.Commands.add('deleteUser', () => {
    const userId = getUserId();
    cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}`,
        headers: {'Content-Type': 'application/json','X-Token': 'healthcheck'},
        body: {
            query:
                `mutation {
                    users {
                        delete(data: {
                            id: "${userId}"
                        }) {
                            status
                        }
                    }
                }`,
        }
    })
});

Cypress.Commands.add('changePassword', () => {
    cy.fixture('users').then((users) => {
        const newUser = users.newUser;
        const userId = getUserId();
        cy.request({
            method: 'POST',
            url: `${Cypress.env('API_URL')}`,
            headers: {'Content-Type': 'application/json','X-Token': 'healthcheck'},
            body: {
                query:
                    `mutation {
                        users {
                            update(data: {
                                id: ${userId},
                                password: "${newUser.newPassword}"
                            }) {
                                status
                            }
                        }
                    }`
            },
        }).then(() =>{
            return {status: 'success'};
        });
    });
});

Cypress.Commands.add('blockUser', () => {
    const userId = getUserId();
    cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}`,
        headers: {'Content-Type': 'application/json','X-Token': 'healthcheck'},
        body: {
            query:
                `mutation {
                    users {
                        update(data: {
                            id: ${userId},
                            disabled: true
                        }) {
                            status
                        }
                    }
                }`
        },
    }).then(() => {
        return {status: 'success'};
    });
});

Cypress.Commands.add('unlockUser', () => {
    const userId = getUserId();
    cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}`,
        headers: {'Content-Type': 'application/json','X-Token': 'healthcheck'},
        body: {
            query:
                `mutation {
                    users {
                        update(data: {
                            id: ${userId},
                            disabled: false
                        }) {
                            status
                        }
                    }
                }`
        },
    }).then(() => {
        return {status: 'success'};
    });
});