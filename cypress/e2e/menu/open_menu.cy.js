describe("Footer Menu", () => {
  before(() => {
    cy.visit("/")
  })
  
  it("has no detectable a11y violations on load", () => {
    cy.get("#footer-menu-button")
      .click()
    cy.customA11yCheck(null, cy.a11yLog)
  })
})