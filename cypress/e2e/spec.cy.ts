describe('Página inicial', () => {
  it('Visita a página inicial do projeto', () => {
    cy.visit('/')
    cy.contains('Simulados disponíveis')
  })
})
