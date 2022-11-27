const baseUrl = Cypress.env('ghostVersion') || 'new';
describe('Sign In', () => {
    beforeEach(() => {
        cy.visit('/ghost/#/signin');
        cy.get('input[name="identification"]').type(Cypress.env('username'))
        cy.get('input[name="password"]').type(Cypress.env('password'))
        cy.get('#ember10').click()
        cy.wait(1000)
        cy.get('a[href="#/editor/post/"]').click()  
    })

    it('CY05 Create a draft Post and Verify Draft List', () => {
        const testId = 'CY05'
        let screenshotId = 1
        let randomString= Name_Alpha_Numeric() 
        cy.get('textarea').type(randomString)   
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
        cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type("Test") 
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)  
        cy.contains('span','Posts').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.wait(1000)
        cy.contains('span','Drafts').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.wait(1000)
        cy.contains('h2','Drafts').should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('h3',randomString).should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
            
    })


    it('CY06 Create a new Post Successfully and validate on website', () => {
        const testId = 'CY06'
        let screenshotId = 1
        let randomString= Name_Alpha_Numeric() 
        cy.get('textarea').type(randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
        cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type("Test") 
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)  
        cy.get('.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.green').should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Continue, final review').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Publish post, right now').should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Publish post, right now').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Boom. It’s out there.').should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.visit('/'+randomString+'/');
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('h1',randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
            
    })


    it('CY07 Create a new Post Successfully and Verify Published List', () => {
        const testId = 'CY07'
        let screenshotId = 1
        let randomString= Name_Alpha_Numeric() 
        cy.get('textarea').type(randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
        cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type("Test")
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)   
        cy.get('.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.green').should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Continue, final review').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Publish post, right now').should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Publish post, right now').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Boom. It’s out there.').should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Editor').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Posts').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Published').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('h2','Published').should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('h3',randomString).should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
            
    })

    it('CY08 Create a new Scheduled Post Successfully and check Scheduled list', () => {
        const testId = 'CY08'
        let screenshotId = 1
        let randomString= Name_Alpha_Numeric() 
        cy.get('textarea').type(randomString)  
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)      
        cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type("Test")  
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`) 
        cy.get('.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.green').should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Right now').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('label','Schedule for later').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Continue, final review').click()   
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','All set!').should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Editor').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('span','Posts').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.wait(1000)
        cy.contains('span','Scheduled').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('h2','Scheduled').should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('h3',randomString).should('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        
    })
    
})

function Name_Alpha_Numeric() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}