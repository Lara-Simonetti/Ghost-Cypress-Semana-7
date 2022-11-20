const baseUrl = Cypress.env('ghostVersion') || 'new';
describe('Sign In', () => {
    beforeEach(() => {
        cy.visit('/ghost/#/signin');
        cy.get('#identification').type(Cypress.env('username'))
        cy.get('#password').type(Cypress.env('password'))
        cy.get('#ember7').click()
        cy.get('.flex-auto.flex.items-center').click() 
        cy.contains('a','Your profile').should('be.visible')
        cy.contains('a','Your profile').click()
    })

    it(' CY01 Edit Admin Account with valid data ', () => {
        const testId = 'CY01'
        let screenshotId = 1
        cy.get('#user-name').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-name').type('Xiomara Camacho Medina')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-slug').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-slug').type('Xiomy')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-location').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-location').type('Londres')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-website').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-website').type('https://www.google.com/')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-facebook').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-facebook').type('https://es-la.facebook.com/')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-twitter').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-twitter').type('https://twitter.com/login')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-bio').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-bio').type('Test')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.gh-btn-green.ember-view')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })

    it(' CY02 Edit Admin Account with invalid data: Blank Name ', () => {
        const testId = 'CY02'
        let screenshotId = 1
        cy.get('#user-name').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-name').type(' ')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-slug').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('p','Please enter a name.')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.gh-btn-red.ember-view')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        

    })


    it('CY03 Change Password: new password and verify new password do not match', () => {
        const testId = 'CY03'
        let screenshotId = 1
        cy.get('.gh-main').scrollTo('bottom')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-password-old').type(Cypress.env('password'))
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-password-new').type('Inglaterra1234!')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-new-password-verification').type('Alemania1234!')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Change Password').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('p','Your new passwords do not match')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        
    })

    it('CY04 Change Password succesfully', () => {
        const testId = 'CY04'
        let screenshotId = 1
        cy.get('.gh-main').scrollTo('bottom')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-password-old').type(Cypress.env('password'))
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-password-new').type('Colombia1235!')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-new-password-verification').type('Colombia1235!')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Change Password').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Password updated')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })


})


