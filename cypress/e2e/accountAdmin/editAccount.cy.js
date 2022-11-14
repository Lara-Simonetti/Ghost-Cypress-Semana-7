describe('Sign In', () => {
    beforeEach(() => {
        cy.visit('/ghost/#/signin');
        cy.get('#identification').type('jeimmy@gmail.com')
        cy.get('#password').type('Colombia1234!')
        cy.get('#ember7').click()
        cy.get('.flex-auto.flex.items-center').click() 
        cy.contains('a','Your profile').should('be.visible')
        cy.contains('a','Your profile').click()
    })

    it(' CY01 Edit Admin Account with valid data ', () => {

        cy.get('#user-name').clear()
        cy.get('#user-name').type('Xiomara Camacho Medina')
        cy.get('#user-slug').clear()
        cy.get('#user-slug').type('Xiomy')
        cy.get('#user-location').clear()
        cy.get('#user-location').type('Londres')
        cy.get('#user-website').clear()
        cy.get('#user-website').type('https://www.google.com/')
        cy.get('#user-facebook').clear()
        cy.get('#user-facebook').type('https://es-la.facebook.com/')
        cy.get('#user-twitter').clear()
        cy.get('#user-twitter').type('https://twitter.com/login')
        cy.get('#user-bio').clear()
        cy.get('#user-bio').type('Test')
        cy.contains('span','Save').click()
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.gh-btn-green.ember-view')
    })

    it(' CY02 Edit Admin Account with invalid data: Blank Name ', () => {

        cy.get('#user-name').clear()
        cy.get('#user-name').type(' ')
        cy.get('#user-slug').clear()
        cy.contains('p','Please enter a name.')
        cy.contains('span','Save').click()
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.gh-btn-red.ember-view')
        

    })


    it('CY03 Change Password: new password and verify new password do not match', () => {

        cy.get('.gh-main').scrollTo('bottom')
        cy.get('#user-password-old').type('Colombia1234!')
        cy.get('#user-password-new').type('Inglaterra1234!')
        cy.get('#user-new-password-verification').type('Alemania1234!')
        cy.contains('span','Change Password').click()
        cy.contains('p','Your new passwords do not match')
        
    })

    it('CY04 Change Password succesfully', () => {

        cy.get('.gh-main').scrollTo('bottom')
        cy.get('#user-password-old').type('Colombia1234!')
        cy.get('#user-password-new').type('Colombia1235!')
        cy.get('#user-new-password-verification').type('Colombia1235!')
        cy.contains('span','Change Password').click()
        cy.contains('span','Password updated')

    })


})


