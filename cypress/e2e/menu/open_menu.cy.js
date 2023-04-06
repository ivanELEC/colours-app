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
})