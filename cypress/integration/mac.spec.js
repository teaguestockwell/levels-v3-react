// <reference types="cypress" />

const host = Cypress.env('CYPRESS_BASE_URL');

describe('mac page', () => {
    // eslint-disable-next-line cypress/no-async-tests
    it('visits home', () => {
        cy.visit(host);
        //expect(true).to.equal(true);
    })
})