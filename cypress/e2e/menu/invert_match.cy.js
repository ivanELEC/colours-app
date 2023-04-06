
import chaiColours from "chai-colors"
chai.use(chaiColours)

describe("Invert Matching Colours", () => {
  before(() => {
    cy.visit("/")
  })

  beforeEach(() => {
    cy.visit("/")
  })
  
  it("defaults invert match as unchecked", () => {
    cy.get("#footer-menu-button")
      .click()
    cy.get("#menu-item-invert")
      .within(() => {
        cy.get("[type='checkbox']")
        .should("not.be.checked")
      })
  })

  it("checks options on click", () => {
    cy.get("#footer-menu-button")
      .click()
    cy.get("#menu-item-invert")
      .within(() => {
        cy.get("[type='checkbox']")
        .click()
        .should("be.checked")
      })
  })

  it("inverts selected colour on click", () => {
    //not a good selector, potentially need to 
    cy.get("[data-cy='chroma-grid-row-0']")
      .within(() => {
        cy.get(".MuiPaper-root").eq(11)
          .click()
      })
    cy.get("#footer-menu-button")
      .click()
    cy.get("#menu-item-invert")
      .within(() => {
        cy.get("[type='checkbox']")
        .click()
      })
    cy.get("[data-cy='chroma-colour-overlay']")
      .should("have.css", "background-color")
      .should("be.colored", "#00ff00")
  })
})