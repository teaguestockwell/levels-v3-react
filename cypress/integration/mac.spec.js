// <reference types="cypress" />

const host = Cypress.env('CYPRESS_BASE_URL');

describe('Sample test', () => {
    it('Visit home', () => {
        cy.visit(host);

    })
})