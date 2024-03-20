describe('Note app', function() {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'kissa',
      username:'Kielo Boy',
      password: 'isheagoodboyofc'
    }
    cy.request('POST',`${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })
  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function () {
    cy.contains('log in').click()
  })

  it('user can login', function() {
    cy.contains('log in').click()
    cy.get('#username').type('Kielo Boy')
    cy.get('#password').type('isheagoodboyofc')
    cy.get('#login-button').click()

    cy.contains('kissa logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('Kielo Boy')
    cy.get('#password').type('i12345')
    cy.get('#login-button').click()

    cy.get('.error')
    .should('contain', 'wrong credentials')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')

  cy.get('html').should('not.contain', 'kissa logged in')

  })

  describe('when logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'Kielo Boy', password: 'isheagoodboyofc' }) // Custom command to login
    })

    it('and several notes exist', function () {
      cy.createNote({ content: 'first note', important: false })      
      cy.createNote({ content: 'second note', important: false })      
      cy.createNote({ content: 'third note', important: false })

      // Your test code for notes existence
    })

    it('one of those can be made important', function () {
      cy.createNote({ content: 'second note', important: false }).then((note) => {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })

    it('a note exists and can be made not important', function () {
      cy.createNote({ content: 'another note cypress', important: true }).then(() => {
        cy.contains('another note cypress').then(() => {
          cy.contains('make not important').click();
          cy.contains('make important').should('exist'); // Ensure that the button text changes after clicking
        });
      });
    });
  })
})