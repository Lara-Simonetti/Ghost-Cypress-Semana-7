describe('Sign In', () => {
    beforeEach(() => {
        cy.visit('/ghost/#/signin');
        cy.get('#identification').type('jeimmy@gmail.com')
        cy.get('#password').type('Colombia1234!')
        cy.get('#ember7').click()
        cy.wait(1000)
        cy.get('a[href="#/editor/post/"]').click()  
    })

    it('Create a draft Post and Verify Draft List', () => {
        let randomString= Name_Alpha_Numeric() 
        cy.get('textarea').type(randomString)        
        cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type("Test")   
        cy.contains('span','Posts').click()
        cy.wait(1000)
        cy.contains('span','Drafts').click()
        cy.wait(1000)
        cy.contains('h2','Drafts').should('be.visible')
        cy.contains('h3',randomString).should('be.visible')
            
    })


    it('Create a new Post Successfully and validate on website', () => {
        let randomString= Name_Alpha_Numeric() 
        cy.get('textarea').type(randomString)        
        cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type("Test")   
        cy.get('.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger').click()
        cy.get('.green').should('be.visible')
        cy.contains('span','Continue, final review').click()
        cy.contains('span','Publish post, right now').should('be.visible')
        cy.contains('span','Publish post, right now').click()
        cy.contains('span','Boom. It’s out there.').should('be.visible')
        cy.visit('/'+randomString+'/');
        cy.contains('h1',randomString)
            
    })


    it('Create a new Post Successfully and Verify Published List', () => {
        let randomString= Name_Alpha_Numeric() 
        cy.get('textarea').type(randomString)        
        cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type("Test")   
        cy.get('.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger').click()
        cy.get('.green').should('be.visible')
        cy.contains('span','Continue, final review').click()
        cy.contains('span','Publish post, right now').should('be.visible')
        cy.contains('span','Publish post, right now').click()
        cy.contains('span','Boom. It’s out there.').should('be.visible')
        cy.contains('span','Editor').click()
        cy.contains('span','Posts').click()
        cy.contains('span','Published').click()
        cy.contains('h2','Published').should('be.visible')
        cy.contains('h3',randomString).should('be.visible')
            
    })

    it('Create a new Scheduled Post Successfully and check Scheduled list', () => {
        let randomString= Name_Alpha_Numeric() 
        cy.get('textarea').type(randomString)        
        cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type("Test")   
        cy.get('.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger').click()
        cy.get('.green').should('be.visible')
        cy.contains('span','Right now').click()
        cy.contains('label','Schedule for later').click()
        cy.contains('span','Continue, final review').click()   
        cy.get('.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click()
        cy.contains('span','All set!').should('be.visible')
        cy.contains('span','Editor').click()
        cy.contains('span','Posts').click()
        cy.wait(1000)
        cy.contains('span','Scheduled').click()
        cy.contains('h2','Scheduled').should('be.visible')
        cy.contains('h3',randomString).should('be.visible')
        
    })
    
})

function Name_Alpha_Numeric() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}