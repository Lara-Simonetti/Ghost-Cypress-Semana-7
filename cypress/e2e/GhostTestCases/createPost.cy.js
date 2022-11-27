//Setting data pool

import {faker} from '@faker-js/faker';

faker.seed(123);

const titlesDataPool = [];
const blogTextDataPool = [];

function getTitles(){
    for(var i=0; i < 40; i++){
        var newText = faker.lorem.paragraphs(3);
        blogTextDataPool.push(newText);
    };
}

function getBlogText(){
    for(var i=0; i < 40; i++){
        var newTitle = faker.lorem.sentence(5);
        titlesDataPool.push(newTitle);
    };
}

getTitles();
getBlogText();

// Test code
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
        let randomString= titlesDataPool[0] 
        cy.get('textarea').type(randomString)   
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
        cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[0]) 
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
        let randomString= titlesDataPool[1] 
        cy.get('textarea').type(randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
        cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[1]) 
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
        let randomString= titlesDataPool[2] 
        cy.get('textarea').type(randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
        cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[2])
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
        let randomString= titlesDataPool[3] 
        cy.get('textarea').type(randomString)  
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)      
        cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[3])  
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

//New tests - standard posts
it('CY21 Create a new Post Successfully and validate on website', () => {
    const testId = 'CY21'
    let screenshotId = 1
    let randomString= titlesDataPool[4] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[4]) 
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

it('CY22 Create a new Post Successfully and validate on website', () => {
    const testId = 'CY22'
    let screenshotId = 1
    let randomString= titlesDataPool[5] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[5]) 
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

it('CY23 Create a new Post Successfully and validate on website', () => {
    const testId = 'CY23'
    let screenshotId = 1
    let randomString= titlesDataPool[6] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[6]) 
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

it('CY24 Create a new Post Successfully and validate on website', () => {
    const testId = 'CY24'
    let screenshotId = 1
    let randomString= titlesDataPool[7] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[7]) 
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

it('CY25 Create a new Post Successfully and validate on website', () => {
    const testId = 'CY25'
    let screenshotId = 1
    let randomString= titlesDataPool[8] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[8]) 
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

it('CY26 Create a new Post Successfully and validate on website', () => {
    const testId = 'CY26'
    let screenshotId = 1
    let randomString= titlesDataPool[9] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[9]) 
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

it('CY27 Create a new Post Successfully and validate on website', () => {
    const testId = 'CY27'
    let screenshotId = 1
    let randomString= titlesDataPool[10] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[10]) 
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

it('CY28 Create a new Post Successfully and validate on website', () => {
    const testId = 'CY28'
    let screenshotId = 1
    let randomString= titlesDataPool[11] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[11]) 
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
    cy.screenshot(`${basenpmUrl}/${testId}-${screenshotId++}`)
    cy.visit('/'+randomString+'/');
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    cy.contains('h1',randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        
})

