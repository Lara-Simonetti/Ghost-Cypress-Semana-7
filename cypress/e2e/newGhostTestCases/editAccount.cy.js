const baseUrl = Cypress.env('ghostVersion') || 'new';
describe('Sign In', () => {
    beforeEach(() => {
        cy.visit('/ghost/#/signin');        
        cy.get('#ember8').type(Cypress.env('username'))
        cy.get('#ember10').type(Cypress.env('password'))
        cy.get('#ember11').click()
        cy.contains('span','Sign in').click()
        cy.get('.w3.mr1.fill-darkgrey').click() 
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
        cy.contains('a','Your Profile').should('be.visible')
        cy.contains('a','Your Profile').click()
    })

    it(' CY01 Edit Admin Account with valid data ', () => {
        const testId = 'CY01'
        let screenshotId = 1
        cy.get('#user-name').clear()
        cy.wait(1000)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-name').type('Xiomara Camacho Medina', {force: true})
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-slug').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.wait(1000)
        cy.get('#user-slug').type('Xiomy', {force: true})
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-location').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.wait(1000)
        cy.get('#user-location').type('Londres', {force: true})
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-website').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.wait(1000)
        cy.get('#user-website').type('https://www.google.com/', {force: true})
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-facebook').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.wait(1000)
        cy.get('#user-facebook').type('https://es-la.facebook.com/yourPage', {force: true})
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-twitter').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.wait(1000)
        cy.get('#user-twitter').type('https://twitter.com/login', {force: true})
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-bio').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-bio').type('Test', {force: true})
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Save').click()
        cy.wait(1000)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn.gh-btn-blue.gh-btn-icon.gh-btn-green.ember-view')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })

    it(' CY02 Edit Admin Account with invalid data: Blank Name ', () => {
        const testId = 'CY02'
        let screenshotId = 1
        cy.get('#user-name').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-name').type(' ', {force: true})
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#user-slug').clear()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('p','Please enter a name.')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn.gh-btn-blue.gh-btn-icon.gh-btn-red.ember-view')
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


