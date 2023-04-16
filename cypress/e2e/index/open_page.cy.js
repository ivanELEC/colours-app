describe("Home Page", () => {
  before(() => {
    cy.visit("/")
  })

  beforeEach(() => {
    cy.visit("/")
  })

  it("has no detectable a11y violations on load", () => {
    cy.customA11yCheck(null, cy.a11yLog)
  })
})