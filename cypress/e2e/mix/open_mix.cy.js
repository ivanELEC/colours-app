import mixData from "../../fixtures/mixData.json"

describe("Mix Page", () => {
  before(() => {
    let mixId = mixData[0].id
    cy.visit(`/Mix/${mixId}`)
  })
  
  it("has no detectable a11y violations on load", () => {
    cy.customA11yCheck(null, cy.a11yLog)
  })
})