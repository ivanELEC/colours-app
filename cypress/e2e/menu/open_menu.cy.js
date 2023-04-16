describe("Footer Menu", () => {
  before(() => {
    cy.visit("/")
  })

  beforeEach(() => {
    cy.visit("/")
  })
  
  it("has no detectable a11y violations on load", () => {
    cy.get("#footer-menu-button")
      .click()
    cy.customA11yCheck(null, cy.a11yLog)
  })

  it("has no detectable a11y violations showing the help modal", () => {
    cy.get("#footer-menu-button")
      .click()
    cy.get("#footer-menu")
      .get(`.MuiList-root > :nth-child(2)`)
        .click()
    cy.customA11yCheck(null, cy.a11yLog)
  })

  it("shows help modal on click of Help", () => {
    cy.get("#footer-menu-button")
      .click()
    cy.get("#footer-menu")
      .get(`.MuiList-root > :nth-child(2)`)
        .click()
    cy.get("#modal-help-title")
      .should("be.visible")
      .and("contain", "Help")
    cy.get("#modal-help-description")   
      .should("be.visible")
      .and("contain", "You can see all mixes by navigating to the Menu")
  })
})