describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user1 = {
      'username': 'paskahousut',
      'name': 'kaka',
      'password': 'niinhaisee'
    }

    const user2 = {
      'username': 'testinguser123',
      'name': 'testuser2',
      'password': 'wedotests'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user1)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
      .click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in')
        .click()
      cy.get('#username').type('paskahousut')
      cy.get('#password').type('niinhaisee')
      cy.get('#login-button').click()

      cy.contains('kaka logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in')
        .click()
      cy.get('#username').type('paskahousut')
      cy.get('#password').type('n1234')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
    })

    it('the wrong credential warning message is red', function() {
      cy.contains('log in')
        .click()
      cy.get('#username').type('paskahousut')
      cy.get('#password').type('n1234')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function () {
      cy.contains('log in')
        .click()
      cy.get('#username').type('paskahousut')
      cy.get('#password').type('niinhaisee')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title'). type('a testing blog')
      cy.get('#author'). type('bob the builder')
      cy.get('#url'). type('www.google.com')
      cy.get('#create-button'). click()

      cy.contains('a testing blog bob the builder')
    })
    describe('a test blog is already created', function() {
      beforeEach( function() {
        cy.contains('new blog')
          .click()
        cy.get('#title'). type('a testing blog')
        cy.get('#author'). type('bob the builder')
        cy.get('#url'). type('www.google.com')
        cy.get('#create-button'). click()

        cy.contains('a testing blog')
      })
      it('users can like a blog' , function() {
    
        cy.contains('view')
          .click()
        cy.contains('like')
          .click() 
        cy.contains('Likes: 1')
      })

      it('blog delete by user', function() {
        // Reload the page to ensure the remove button is rendered
        cy.reload()
      
        cy.contains('view').click()
        cy.get('#remove-button').click({ force: true })
        cy.contains('remove').should('not.exist')
      })
    })
    describe('different users logged in', function() {
      beforeEach( function() {
        cy.contains('log out')
          .click()
        cy.get('#username').type('testinguser123')
        cy.get('#password').type('wedotests')
        cy.get('#login-button').click()
        cy.contains('testuser2 logged in')
        
      })
      it('Deletion is linked to userID', function() {
        cy.contains('new blog')
          .click()
        cy.get('#title'). type('blog by user2')
        cy.get('#author'). type('user2')
        cy.get('#url'). type('www.cia.com')
        cy.get('#create-button'). click()

        cy.contains('blog by user2')

        cy.contains('log out')
          .click()
        cy.get('#username').type('paskahousut')
        cy.get('#password').type('niinhaisee')
        cy.get('#login-button').click()
        cy.contains('kaka logged in')

        cy.contains('view') .click()
        cy.contains('remove').should('not.exist')   
      })

      it('blogs are sorted by the amount of likes', function(){
    
        cy.contains('new blog').click()
        cy.get('#title'). type('The title with the most likes')
        cy.get('#author'). type('user2')
        cy.get('#url'). type('www.testing.fi')
        cy.get('#create-button'). click()

        cy.contains('view').click()
        cy.get('#like-button').click()
      
        cy.get('#title'). type('The title with the second most likes')
        cy.get('#author'). type('user2')
        cy.get('#url'). type('www.testing.fi')
        cy.get('#create-button'). click()

        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
      })
    })
  })
})
