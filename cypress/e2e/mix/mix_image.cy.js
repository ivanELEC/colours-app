import mixData from "../../fixtures/mixData.json"

describe("Mix Page", () => {
  before(() => {
    let mixId = mixData[0].id
    cy.visit(`/Mix/${mixId}`)
  })
  
  it("has no detectable accessibiliy issues when viewing a mix image", () => {
    cy.get("#chroma-mix-img-link")
		.click()
	cy.customA11yCheck(null, cy.a11yLog)
  })
})