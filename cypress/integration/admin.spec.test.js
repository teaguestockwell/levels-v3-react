const host = Cypress.env('CYPRESS_BASE_URL');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('admin portal', () => {
  // remove sw cache to prevent cyypress from testing an old build
  beforeEach(() => {
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations()
      .then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }
})

  it('loads', () => {
    cy.visit(host)
    cy.get('[data-testid="admin nav icon"]').click()
  })

  it('will edit cargo, then user will receive update to that cargo', () => {
    //setup
    cy.visit(host)

    cy.request(
      'PUT',
      'http://localhost:8080/fl-api/cargo',
      {
        "cargoId": 1,
        "aircraftId": 1,
        "name": "Water Container (5 Gallon)",
        "weight": 40,
        "fs": 358,
        "category": "Steward"
      }
    )

    cy.get('[data-testid="admin nav icon"]').click()

    // get er plane
    cy.get('[data-testid="admin air select"]').type('C-17')
    cy.get('.ant-select-item-option').contains(/C-17A-ER$/).click()
    cy.contains(/C-17A-ER$/)
  

    cy.get('[data-testid="admin cargos"]').click()
    cy.get('[data-testid="Water Container (5 Gallon) admin edit"]').click()

    // edit item
    cy.get('#name').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}6 gal')
    cy.get('#weight').type('{backspace}{backspace}45.123')
    cy.get('#fs').type('{backspace}{backspace}{backspace}300.123')
    cy.get('#category').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}Extra')
    
    // let it finish validating
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)

    // save it
    cy.contains('Save').click()
    cy.contains('300.123')
    cy.contains('45.123')
    cy.contains('358').should('not.exist')

    cy.get('[data-testid="%MAC nav icon"]').click()

    // get er plane
    cy.get('[data-testid="user air select"]').type('C-17')
    cy.get('.ant-select-item-option').contains(/C-17A-ER$/).click()
    cy.contains(/C-17A-ER$/)

    // no changes will be made until user selects to sync state
    // add from addenda a
    cy.get('[data-testid="user add adda"]').click()
    cy.contains('Water Container (5 Gallon)').click()
    
    // click the client sync button, by its id, based on its unsycned state
    cy.get('[data-testid="#F9AD14"]', {timeout: 20000}).click()
    cy.get('[data-testid="client sync but"]').click()

    // get er plane
    cy.get('[data-testid="user air select"]').type('C-17')
    cy.get('.ant-select-item-option').contains(/C-17A-ER$/).click()
    cy.contains(/C-17A-ER$/)

    // asert the admin made updates by adding the new cargo
    // add from addenda a
    cy.get('[data-testid="user add adda"]').click()
    cy.contains('Water Container 6 gal').click()

    // tear down
    cy.request(
      'PUT',
      'http://localhost:8080/fl-api/cargo',
      {
        "cargoId": 1,
        "aircraftId": 1,
        "name": "Water Container (5 Gallon)",
        "weight": 40,
        "fs": 358,
        "category": "Steward"
      }
    )
  })
})