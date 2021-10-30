/// <reference types="cypress" />
import mixData from '../../../src/data/mixData.json';

describe('open homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000') 
  })

  it('displays all mixes in mixData', () => {
    cy.get('#chroma-mix-grid')
      .find('[id^="chroma-mix-item-"]')
      .should('have.length', mixData.data.length)

  })


  it('mix navigates to mix page', () => {
    for (const mix of mixData.data) {
      cy.visit('http://localhost:3000')
      cy.get(`#chroma-mix-item-${mix.id}`).click()
      cy.url()
        .should('contain', `/Mix/${encodeURIComponent(mix.id)}`)
    }
  })
})
