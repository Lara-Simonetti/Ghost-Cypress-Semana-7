describe('My First Test', () => {
    beforeEach(()=>{
      cy.request('POST', '/ghost/api/admin/session', {
        username: Cypress.env('username'),
        password: Cypress.env('password')
      })
    })
    it('CY11 Try to subscribe with an non-created member', () => {
      cy.visit('/')
      cy.wait(1000)
      cy.get('a.gh-head-button.gh-portal-close').click({ force: true })
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('.gh-portal-signup-message > button').click()
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('#input-email').type('test@test.com')
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('button.gh-portal-btn.gh-portal-btn-main.gh-portal-btn-primary').click()
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').should('not.contain', 'Now check your email!')
    })
  
    it('CY12 Subscribe with a new member', () => {
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.contains('li','Members').click()
      cy.contains('a > span', 'New member').click()
      cy.get('#member-name').type("test")
      cy.get('#member-email').type("p.higuera@uniandes.edu.co")
      cy.contains('button > span', 'Save').click()
      cy.wait(1000)
      cy.visit('/')
      cy.wait(1000)
      cy.get('a.gh-head-button.gh-portal-close').click({ force: true })
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('.gh-portal-signup-message > button').click()
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('#input-email').type('p.higuera@uniandes.edu.co')
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('button.gh-portal-btn.gh-portal-btn-main.gh-portal-btn-primary').click()
      cy.wait(3000)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').should('not.contain', 'No member exists with this e-mail address. Please sign up first.')
    })
  
    it('CY13 Try to create a member with an used email ', () => {
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.contains('li','Members').click()
      cy.contains('a > span', 'New member').click()
      cy.get('#member-name').type("test")
      cy.get('#member-email').type("p.higuera@uniandes.edu.co")
      cy.contains('button > span', 'Save').click()
      cy.on('uncaught:exception', (err, runnable) => {
        return false
      })
      cy.wait(1000)
      cy.get('p.response').should('contain','Member already exists. Attempting to add member with existing email address')
    })
  
    it('CY14 Try to create a member with a wrong format email ', () => {
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.contains('li','Members').click()
      cy.contains('a > span', 'New member').click()
      cy.get('#member-name').type("test")
      cy.get('#member-email').type("test")
      cy.contains('button > span', 'Save').click()
      cy.on('uncaught:exception', (err, runnable) => {
        return false
      })
      cy.wait(1000)
      cy.get('p.response').should('contain','Invalid Email.')
    })
  
    it('CY15 Subscribe with a new member with the retry option ', () => {
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.contains('li','Members').click()
      cy.contains('a > span', 'New member').click()
      cy.get('#member-name').type("test")
      cy.get('#member-email').type("test")
      cy.contains('button > span', 'Save').click()
      cy.on('uncaught:exception', (err, runnable) => {
        return false
      })
      cy.wait(1000)
      cy.get('#member-email').clear().type("pahf33@gmail.com")
      cy.contains('button > span', 'Retry').click()
  
      cy.visit('/')
      cy.wait(1000)
      cy.get('a.gh-head-button.gh-portal-close').click({ force: true })
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('.gh-portal-signup-message > button').click()
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('#input-email').type("pahf33@gmail.com")
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('button.gh-portal-btn.gh-portal-btn-main.gh-portal-btn-primary').click()
      cy.wait(3000)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').should('not.contain', 'No member exists with this e-mail address. Please sign up first.')
    })
  
    it('CY16 Deleting a member', () => {
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.contains('li','Members').click()
      cy.get('tr > a:first').click()
      cy.get('.view-actions button:first').click()
      cy.contains('span','Delete member').click()
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span', 'Delete member').click()
      cy.wait(1000)
      cy.get('.epm-modal-container').should('contain','Are you sure you want to leave this page?')
    })
  
    it('CY17 Cancel deleting a member', () => {
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.contains('li','Members').click()
      cy.get('tr > a:first').click()
      cy.get('.view-actions button:first').click()
      cy.contains('span','Delete member').click()
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span', 'Cancel').click()
      cy.wait(1000)
      cy.get('.epm-modal-container').should('not.exist')
    })
  
    it('CY18 Leave the page when deleting a member', () => {
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.contains('li','Members').click()
  
      cy.contains('a > span', 'New member').click()
      cy.get('#member-name').type("test")
      cy.get('#member-email').type("pahf33@gmail.com")
      cy.contains('button > span', 'Save').click()
      cy.wait(1000)
  
      cy.contains('li','Members').click()
      cy.get('tr > a:first').click()
      cy.get('.view-actions button:first').click()
      cy.contains('span','Delete member').click()
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span', 'Delete member').click()
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span','Leave').click()
      cy.wait(1000)
      cy.url().should('include','/ghost/#/members')
    })
  
    it('CY19 Stay in page when deleting a member', () => {
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.contains('li','Members').click()
  
      cy.contains('a > span', 'New member').click()
      cy.get('#member-name').type("test")
      cy.get('#member-email').type("pahf33@gmail.com")
      cy.contains('button > span', 'Save').click()
      cy.wait(1000)
  
      cy.contains('li','Members').click()
      cy.get('tr > a:first').click()
      cy.get('.view-actions button:first').click()
      cy.contains('span','Delete member').click()
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span', 'Delete member').click()
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span','Leave').click()
      cy.get('.epm-modal-container').should('not.exist')
    })
  
    it('CY20 List the created member', () => {
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.contains('li','Members').click()
  
      cy.contains('a > span', 'New member').click()
      cy.get('#member-name').type("Pedro Higuera")
      cy.get('#member-email').type("pahf33@gmail.com")
      cy.contains('button > span', 'Save').click()
      cy.wait(1000)
  
      cy.contains('li','Members').click()
      cy.get('.gh-list > tbody > tr:first > a > div > div > h3').should('contain','Pedro Higuera')
    })
  })