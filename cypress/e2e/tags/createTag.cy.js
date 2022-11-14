describe('Sign In', () => {
    beforeEach(() => {
        cy.visit('/ghost/#/signin');
        cy.get('#identification').type(Cypress.env('username'))
        cy.get('#password').type(Cypress.env('password'))
        cy.get('#ember7').click()
        cy.contains('a','Tags').click()
        cy.wrap(Math.floor(Math.random() * 89999 + 10000)).as("randomInt");
    })


    it('CY09 Create a new tag Successfully ', () => {
        cy.wait(1000)
        let randomString= Name_Alpha_Numeric() 
        cy.get('.ember-view.gh-btn.gh-btn-primary').click()
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.get('#tag-slug').type('New Tag')
        cy.get('#tag-description').type('Tag Test')
        cy.get('.gh-main').scrollTo('top')
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click()
        cy.contains('a','Tags').click()
        cy.contains('h3',"New Tag"+randomString)    

    })

    it('CY10 Create a new tag Unsuccessfully: blank name ', () => {
        cy.wait(1000)
        let randomString= Name_Alpha_Numeric() 
        cy.get('.ember-view.gh-btn.gh-btn-primary').click()
        cy.get('#tag-name').type(' ')
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click()
        cy.contains('p','You must specify a name for the tag.').should ('be.visible')
            
        
    })
})

function Name_Alpha_Numeric() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
