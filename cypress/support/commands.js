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
// const sqlite3 = require('sqlite3')

Cypress.Commands.add('login', (email, password) => {

    cy.get('[data-aut-id="btnLogin"]').click()
    cy.get('[data-aut-id="emailLogin"]').click()
    cy.get('#email_input_field').type(email + '{enter}')
    cy.get('#password').type(password + '{enter}')
})

Cypress.Commands.add('getCall', (url) => {
    cy.request({
        method: 'GET',
        url: url,
        headers: {
            'x-session-token': 'authorized-user',
            'content-type': 'application/json'

        }
    })
})
Cypress.Commands.add('postCall', (url, data) => {
    cy.request({
        method: 'POST',
        url: url,
        body: data,
        headers: {
            'x-session-token': 'authorized-user',
            'content-type': 'application/json'

        }
    })
})

// Cypress.Commands.add('connectDB', (url, data) => {
//     let db = new sqlite3.Database('/Users/dharma/Desktop/sdet-assignment-main/customers.db', (err) => {
//         if (err) {
//             console.error(err.message);
//         }
//         console.log('Connected to the data database.');
//     });
// })