import {faker} from '@faker-js/faker'

const baseUrl = Cypress.env('ghostVersion') || 'new';

describe('Sign In', () => {
    beforeEach(() => {
        cy.visit('/ghost/#/signin');
        cy.get('input[name="identification"]').type(Cypress.env('username'))
        cy.get('input[name="password"]').type(Cypress.env('password'))
        cy.contains('button','Sign in').click()
        cy.get('.flex-auto.flex.items-center').click() 
        cy.contains('a','Your profile').should('be.visible')
        cy.contains('a','Your profile').click()
    })

    it('CY49 Edit Admin Account with valid Name', () => {
        const testId = 'CY49'
        cy.get('#user-name').clear()
        cy.wait(10)
        cy.get('#user-name').type(faker.name.firstName())
        cy.wait(10)
        cy.contains('span','Save').click()
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.gh-btn-green.ember-view')
    })


    it('CY50 Edit Admin Account with valid slug', () => {
        const testId = 'CY50'
        cy.get('#user-slug').clear()
        cy.wait(10)
        cy.get('#user-slug').type(faker.random.word())
        cy.wait(10)
        cy.contains('span','Save').click()
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.gh-btn-green.ember-view')
    })

    it('CY51 Edit Admin Account with valid location', () => {
        const testId = 'CY51'
        cy.get('#user-location').clear()
    cy.wait(10)
        cy.get('#user-location').type(faker.address.city())
        cy.wait(10)
        cy.contains('span','Save').click()
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.gh-btn-green.ember-view')
    })


    it('CY52 Edit Admin Account with valid Facebook URL', () => {
        const testId = 'CY52'
        cy.get('#user-facebook').clear()
        cy.wait(10)
        cy.get('#user-facebook').type('https://facebook.com/'+faker.random.word())
        cy.wait(10)
        cy.contains('span','Save').click()
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.gh-btn-green.ember-view')
    })

    it('CY53 Edit Admin Account with valid twitter URL', () => {
        const testId = 'CY53' 
         cy.get('#user-twitter').clear()
        cy.wait(10)
        cy.get('#user-twitter').type('https://twitter.com/'+faker.random.word())
        cy.contains('span','Save').click()
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.gh-btn-green.ember-view')
    })


    it('CY54 Edit Admin Account with valid limit of Bio Characters', () => {
        const testId = 'CY54'
        cy.get('#user-bio').clear()
        cy.get('#user-bio').type(faker.random.word())
        cy.contains('span','Save').click()
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.gh-btn-green.ember-view')
    })

    it(' CY55 Edit Admin Account with invalid data: Special Character in Name Field ', () => {
        const testId = 'CY55'
        cy.get('#user-name').clear()
        cy.get('#user-name').type(faker.helpers.arrayElement(['*','@','#','!','¬','&']))
        cy.contains('span','Save').click()
        cy.contains('span','Retry')
              
    })

    it('CY56 Edit Admin Account with invalid data: Special Character in Slug Field ', () => {
        const testId = 'CY56'
        cy.get('#user-slug').clear()
        cy.get('#user-slug').type(faker.helpers.arrayElement(['*','@','#','!','¬','&']))
        cy.contains('span','Save').click()
        cy.contains('span','Retry')
              
    })

    it(' CY57 Edit Admin Account with invalid data: Special Character in Location field', () => {
        const testId = 'CY57'
        cy.get('#user-name').clear()
        cy.wait(10)
        cy.get('#user-name').type(faker.name.firstName())
        cy.get('#user-location').clear()
        cy.get('#user-location').type(faker.helpers.arrayElement(['*','@','#','!','¬','&']))
        cy.contains('span','Save').click()
        cy.contains('span','Retry')
              
    })



    it(' CY58 Edit Admin Account with invalid data: Different URL for facebook field', () => {
        const testId = 'CY58'
        cy.get('#user-facebook').clear()
        cy.get('#user-facebook').type(faker.internet.url())
        cy.get('#user-location').click()
        cy.contains('p','The URL must be in a format like https://www.facebook.com/yourPage')
              
    })

    it(' CY59 Edit Admin Account with invalid data: Different URL for twitter field', () => {
        const testId = 'CY59'
        cy.get('#user-twitter').clear()
        cy.get('#user-twitter').type(faker.internet.url())
        cy.get('#user-location').click()
        cy.contains('p','The URL must be in a format like https://twitter.com/yourUsername')
              
    })

    it(' CY60 Edit Admin Account with invalid data: Special Caracter in URL for twitter field', () => {
        const testId = 'CY60'
        cy.get('#user-twitter').clear()
        cy.get('#user-twitter').type(faker.helpers.arrayElement(['*','@','#','!','¬','&']))
        cy.get('#user-location').click()
        cy.contains('p','The URL must be in a format like https://twitter.com/yourUsername')
              
    })

    it(' CY61 Edit Admin Account with invalid data: Special Caracter in URL for twitter field', () => {
        const testId = 'CY61'
        cy.get('#user-facebook').clear()
        cy.get('#user-facebook').type(faker.helpers.arrayElement(['*','@','#','!','¬','&']))
        cy.get('#user-location').click()
        cy.contains('p','The URL must be in a format like https://www.facebook.com/yourPage')           
    })


    it(' CY62 Edit Admin Account with invalid data: Different URL for twitter field', () => {
        const testId = 'CY62'
        cy.get('#user-bio').clear()
        cy.get('#user-bio').type(faker.lorem.paragraph())
        cy.get('#user-location').click()
        cy.contains('p','Bio is too long')
        cy.contains('span','Save').click()
        cy.contains('span','Retry')
    })


    it('CY63 Change Password: new passwords has not enough characters', () => {
        const testId = 'CY63'
        let newPassword =faker.random.word();
        cy.get('.gh-main').scrollTo('bottom')
        cy.get('#user-password-old').type(Cypress.env('password'))
        cy.get('#user-password-new').type(newPassword)
        cy.get('#user-new-password-verification').type(newPassword)
        cy.contains('span','Change Password').click()
        cy.contains('p','Password must be at least 10 characters long.')        
    })


    it('CY64 Change Password: new passwords has too many characters more than 200 char', () => {
        const testId = 'CY64'
        let newPassword =faker.lorem.paragraph();
        cy.get('.gh-main').scrollTo('bottom')
        cy.get('#user-password-old').type(Cypress.env('password'))
        cy.get('#user-password-new').type(newPassword)
        cy.wait(100)
        cy.get('#user-new-password-verification').type(newPassword)
        cy.wait(100)
        cy.contains('span','Change Password').click()
        cy.contains('span','Password updated')      
        cy.get('.gh-main').scrollTo('bottom')
        cy.get('#user-password-old').type(newPassword)
        cy.wait(100)
        cy.get('#user-password-new').type('Colombia1234!')
        cy.get('#user-new-password-verification').type('Colombia1234!')
        cy.contains('span','Retry').click()
        cy.contains('span','Password updated')
    })

    it('CY65 Change Password: new passwords has not enough characters', () => {
        cy.get('.gh-main').scrollTo('bottom')
        cy.get('#user-password-old').type(Cypress.env('password'))
        cy.get('#user-password-new').type(' ')
        cy.get('#user-new-password-verification').type(' ')
        cy.contains('span','Change Password').click()
        cy.contains('p','Sorry, passwords')        
    })

    it('CY66 Change Password: new passwords is not safe', () => {
        let newPassword= faker.helpers.arrayElement(['1111111111','22222222222','aaaaaaaaaaaaa','bbbbbbbbbbb'])
        cy.get('.gh-main').scrollTo('bottom')
        cy.get('#user-password-new').type(newPassword)
        cy.contains('span','Change Password').click()
        cy.contains('p','Sorry, you cannot use an insecure password.')        
    })

    it('CY67 Change Password: Old Password can not be blank', () => {
        cy.get('.gh-main').scrollTo('bottom')
        cy.get('#user-password-old').type(' ')
        cy.contains('span','Change Password').click()
        cy.contains('p','Your current password is required to set a new one')        
    })

    it('CY68 Change Email: Old Password can not be blank', () => {
        cy.get('#user-email').clear()
        cy.get('#user-email').type(faker.random.word())
        cy.get('#user-slug').click()
        cy.contains('p','Please supply a valid email address')        
    })

    it(' CY69 Edit Admin Account with invalid data: Numeric value in Name Field ', () => {
        const testId = 'CY55'
        cy.get('#user-name').clear()
        cy.get('#user-name').type(faker.random.numeric())
        cy.contains('span','Save').click()
        cy.contains('span','Retry')
              
    })

    it(' CY70 Edit Admin Account with invalid data: Numeric value in Slug Field ', () => {
        const testId = 'CY56'
        cy.get('#user-slug').clear()
        cy.get('#user-slug').type(faker.random.numeric())
        cy.contains('span','Save').click()
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.gh-btn-green.ember-view')
              
    })

    it(' CY71 Edit Admin Account with invalid data: Number value in Location field', () => {
        const testId = 'CY71'
        cy.get('#user-name').clear()
        cy.wait(10)
        cy.get('#user-name').type(faker.name.firstName())
        cy.get('#user-location').clear()
        cy.get('#user-location').type(faker.random.numeric())
        cy.contains('span','Save').click()
        cy.contains('span','Retry')
              
    })


    it(' CY72 Edit Admin Account with invalid data: Email value in Name Field ', () => {
        const testId = 'CY72'
        cy.get('#user-name').clear()
        cy.get('#user-name').type(faker.internet.email())
        cy.contains('span','Save').click()
        cy.contains('span','Retry')
              
    })

    it(' CY73 Edit Admin Account with invalid data: Email value in Slug Field ', () => {
        const testId = 'CY73'
        cy.get('#user-slug').clear()
        cy.get('#user-slug').type(faker.internet.email())
        cy.contains('span','Save').click()
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.gh-btn-green.ember-view')
              
    })

    it(' CY74 Edit Admin Account with invalid data: Email value in Location field', () => {
        const testId = 'CY74'
        cy.get('#user-name').clear()
        cy.wait(10)
        cy.get('#user-name').type(faker.name.firstName())
        cy.get('#user-location').clear()
        cy.get('#user-location').type(faker.internet.email())
        cy.contains('span','Save').click()
        cy.contains('span','Retry')
              
    })

    it(' CY75 Edit Admin Account with invalid data: Address value in Name Field ', () => {
        const testId = 'CY55'
        cy.get('#user-name').clear()
        cy.get('#user-name').type(faker.address.streetAddress())
        cy.contains('span','Save').click()
        cy.contains('span','Retry')
              
    })

    it(' CY76 Edit Admin Account with invalid data: Address value in Name Field ', () => {
        const testId = 'CY55'
        cy.get('#user-name').clear()
        cy.get('#user-name').type(faker.address.streetAddress())
        cy.contains('span','Save').click()
        cy.contains('span','Retry')
              
    })

})


