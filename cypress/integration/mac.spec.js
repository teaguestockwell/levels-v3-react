// <reference types="cypress" />

const host = Cypress.env('CYPRESS_BASE_URL');

describe('Sample test', () => {
    // eslint-disable-next-line cypress/no-async-tests
    it('Visit home', async () => {
        // await setTimeout(() =>{
            cy.visit(host);
            expect(true).to.equal(true)
        // },5000)
    })
})