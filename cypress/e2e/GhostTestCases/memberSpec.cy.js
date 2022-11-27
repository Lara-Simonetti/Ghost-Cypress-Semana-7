const baseUrl = Cypress.env('ghostVersion') || 'new';
describe('My First Test', () => {
    beforeEach(()=>{
      cy.request('POST', '/ghost/api/admin/session', {
        username: Cypress.env('username'),
        password: Cypress.env('password')
      })
    })
    it('CY11 Try to subscribe with an non-created member', () => {
      const testId = 'CY11', screenshotId = 1
      cy.visit('/')
      cy.wait(1000)
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('a.gh-head-button.gh-portal-close').click({ force: true })
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('.gh-portal-signup-message > button').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('#input-email').type('test@test.com')
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('button.gh-portal-btn.gh-portal-btn-main.gh-portal-btn-primary').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').should('not.contain', 'Now check your email!')
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })
  
    it('CY12 Subscribe with a new member', () => {
      const testId = 'CY12', screenshotId = 1
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('li','Members').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('a > span', 'New member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-name').type("test")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-email').type("p.higuera@uniandes.edu.co")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('button > span', 'Save').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
      cy.visit('/')
      cy.wait(1000)
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('a.gh-head-button.gh-portal-close').click({ force: true })
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('.gh-portal-signup-message > button').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('#input-email').type('p.higuera@uniandes.edu.co')
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('button.gh-portal-btn.gh-portal-btn-main.gh-portal-btn-primary').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(3000)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').should('not.contain', 'No member exists with this e-mail address. Please sign up first.')
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })
  
    it('CY13 Try to create a member with an used email ', () => {
      const testId = 'CY13', screenshotId = 1
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('li','Members').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('a > span', 'New member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-name').type("test")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-email').type("p.higuera@uniandes.edu.co")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('button > span', 'Save').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.on('uncaught:exception', (err, runnable) => {
        return false
      })
      cy.wait(1000)
      cy.get('p.response').should('contain','Member already exists. Attempting to add member with existing email address')
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })
  
    it('CY14 Try to create a member with a wrong format email ', () => {
      const testId = 'CY14', screenshotId = 1
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('li','Members').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('a > span', 'New member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-name').type("test")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-email').type("test")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('button > span', 'Save').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.on('uncaught:exception', (err, runnable) => {
        return false
      })
      cy.wait(1000)
      cy.get('p.response').should('contain','Invalid Email.')
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })
  
    it('CY15 Subscribe with a new member with the retry option ', () => {
      const testId = 'CY15', screenshotId = 1
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('li','Members').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('a > span', 'New member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-name').type("test")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-email').type("test")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('button > span', 'Save').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.on('uncaught:exception', (err, runnable) => {
        return false
      })
      cy.wait(1000)
      cy.get('#member-email').clear().type("pahf33@gmail.com")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('button > span', 'Retry').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
  
      cy.visit('/')
      cy.wait(1000)
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('a.gh-head-button.gh-portal-close').click({ force: true })
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('.gh-portal-signup-message > button').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('#input-email').type("pahf33@gmail.com")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').find('button.gh-portal-btn.gh-portal-btn-main.gh-portal-btn-primary').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(3000)
      cy.iframe('#ghost-portal-root > div:first > iframe[title=portal-popup]').should('not.contain', 'No member exists with this e-mail address. Please sign up first.')
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })
  
    it('CY16 Deleting a member', () => {
      const testId = 'CY16', screenshotId = 1
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('li','Members').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('tr > a:first').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('.view-actions button:first').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('span','Delete member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span', 'Delete member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
      cy.get('.epm-modal-container').should('contain','Are you sure you want to leave this page?')
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })
  
    it('CY17 Cancel deleting a member', () => {
      const testId = 'CY17', screenshotId = 1
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('li','Members').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('tr > a:first').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('.view-actions button:first').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('span','Delete member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span', 'Cancel').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
      cy.get('.epm-modal-container').should('not.exist')
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })
  
    it('CY18 Leave the page when deleting a member', () => {
      const testId = 'CY18', screenshotId = 1
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('li','Members').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
  
      cy.contains('a > span', 'New member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-name').type("test")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-email').type("pahf33@gmail.com")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('button > span', 'Save').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
  
      cy.contains('li','Members').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('tr > a:first').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('.view-actions button:first').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('span','Delete member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span', 'Delete member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span','Leave').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
      cy.url().should('include','/ghost/#/members')
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })
  
    it('CY19 Stay in page when deleting a member', () => {
      const testId = 'CY19', screenshotId = 1
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('li','Members').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
  
      cy.contains('a > span', 'New member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-name').type("test")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-email').type("pahf33@gmail.com")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('button > span', 'Save').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
  
      cy.contains('li','Members').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('tr > a:first').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('.view-actions button:first').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('span','Delete member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span', 'Delete member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span','Leave').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('.epm-modal-container').should('not.exist')
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })
  
    it('CY20 List the created member', () => {
      const testId = 'CY20', screenshotId = 1
      cy.visit('/ghost/dashboard')
      cy.wait(1000)
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('li','Members').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
  
      cy.contains('a > span', 'New member').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-name').type("Pedro Higuera")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('#member-email').type("pahf33@gmail.com")
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.contains('button > span', 'Save').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.wait(1000)
  
      cy.contains('li','Members').click()
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
      cy.get('.gh-list > tbody > tr:first > a > div > div > h3').should('contain','Pedro Higuera')
      cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })
  })