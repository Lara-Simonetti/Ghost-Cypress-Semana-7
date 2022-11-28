//Setting data pool

import {faker} from '@faker-js/faker';

faker.seed(123);

const titlesDataPool = [];
const blogTextDataPool = [];
const invalidDataPool = [];

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

function getInvalidData(){
    var blankSpace = "";
    var breakSpace = "\n";

    for(var i=0; i < 5; i++){
        invalidDataPool.push(blankSpace);
        blankSpace+=" ";
    }
    for(var i=0; i < 5; i++){
        var newData = faker.finance.currencySymbol()*10;
        invalidDataPool.push(newData);
    };

    for(var i=0; i < 5; i++){
        var newData = faker.git.commitSha();
        invalidDataPool.push(newData);
    };

    for(var i=0; i < 5; i++){
        var newData = faker.git.commitSha();
        invalidDataPool.push(newData);
    };

    for(var i=0; i < 5; i++){
        invalidDataPool.push(breakSpace);
        breakSpace+="\n";
    };

    for(var i=0; i<invalidDataPool.length; i++){
        invalidDataPool[i] = invalidDataPool[i].toString();
    }
    
}

getTitles();
getBlogText();
getInvalidData();

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
        cy.visit('/'+randomString.slice(0, -1)+'/');
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
        cy.contains('span','All set!').should('be.visible')
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
        cy.contains('span','Ready, set, publish.').should('be.visible')
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
    cy.visit('/'+randomString.slice(0, -1)+'/');
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
    cy.visit('/'+randomString.slice(0, -1)+'/');
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
    cy.visit('/'+randomString.slice(0, -1)+'/');
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
    cy.visit('/'+randomString.slice(0, -1)+'/');
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
    cy.visit('/'+randomString.slice(0, -1)+'/');
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    cy.contains('h1',randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        
})

it('CY26 Create a draft Post and Verify Draft List', () => {
    const testId = 'CY26'
    let screenshotId = 1
    let randomString= titlesDataPool[9] 
    cy.get('textarea').type(randomString)   
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[9]) 
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

it('CY27 Create a draft Post and Verify Draft List', () => {
    const testId = 'CY27'
    let screenshotId = 1
    let randomString= titlesDataPool[10] 
    cy.get('textarea').type(randomString)   
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[10]) 
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

it('CY28 Create a new Post and validate on Website (switch title and text data pools)', () => {
    const testId = 'CY28'
    let screenshotId = 1
    let randomString= blogTextDataPool[11] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(titlesDataPool[11]) 
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
    cy.visit('/'+randomString.slice(0, -1)+'/');
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    cy.contains('h1',randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        
})

it('CY29 Create a new Post (switch title and text data pools)', () => {
    const testId = 'CY29'
    let screenshotId = 1
    let randomString= blogTextDataPool[12] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(titlesDataPool[12]) 
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
    cy.visit('/'+randomString.slice(0, -1)+'/');
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    cy.contains('h1',randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        
})

it('CY30 Create a draft Post (switch title and text data pools)', () => {
    const testId = 'CY30'
    let screenshotId = 1
    let randomString= blogTextDataPool[13] 
    cy.get('textarea').type(randomString)   
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(titlesDataPool[13]) 
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

it('CY31 Create a draft Post (switch title and text data pools)', () => {
    const testId = 'CY30'
    let screenshotId = 1
    let randomString= blogTextDataPool[14] 
    cy.get('textarea').type(randomString)   
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(titlesDataPool[14]) 
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

it('CY32 Create a new Post (switch title and text data pools)', () => {
    const testId = 'CY32'
    let screenshotId = 1
    let randomString= titlesDataPool[15] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(blogTextDataPool[15])
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

it('CY33 Create a new Post (switch title and text data pools)', () => {
    const testId = 'CY33'
    let screenshotId = 1
    let randomString= blogTextDataPool[16] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(titlesDataPool[16])
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

it('CY34 Create a new Post, Verify Published List (switch title and text data pools)', () => {
    const testId = 'CY34'
    let screenshotId = 1
    let randomString= blogTextDataPool[17] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(titlesDataPool[17])
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

it('CY35 Create a new Post, Verify Published List (Invalid Data)', () => {
    const testId = 'CY35'
    let screenshotId = 1
    let randomString= invalidDataPool[1] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-1])
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

it('CY36 Create a new Post, Verify Published List (Invalid Data)', () => {
    const testId = 'CY36'
    let screenshotId = 1
    let randomString= invalidDataPool[2] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-2])
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

it('CY37 Create a new Post, Verify Published List (Invalid Data)', () => {
    const testId = 'CY37'
    let screenshotId = 1
    let randomString= invalidDataPool[3] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-3])
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

it('CY38 Create a new Post, Validate on Website (Invalid Data)', () => {
    const testId = 'CY38'
    let screenshotId = 1
    let randomString= invalidDataPool[4] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-4]) 
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
    cy.visit('/'+randomString.slice(0, -1)+'/');
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    cy.contains('h1',randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        
})

it('CY39 Create a new Post, Validate on Website (Invalid Data)', () => {
    const testId = 'CY39'
    let screenshotId = 1
    let randomString= invalidDataPool[5] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-5]) 
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
    cy.visit('/'+randomString.slice(0, -1)+'/');
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    cy.contains('h1',randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        
})

it('CY40 Create a new Post, Validate on Website (Invalid Data)', () => {
    const testId = 'CY40'
    let screenshotId = 1
    let randomString= invalidDataPool[6] 
    cy.get('textarea').type(randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)        
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-6]) 
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
    cy.visit('/'+randomString.slice(0, -1)+'/');
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    cy.contains('h1',randomString)
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        
})

it('CY41 Create a new Draft Post (Invalid Data)', () => {
    const testId = 'CY41'
    let screenshotId = 1
    let randomString= invalidDataPool[7] 
    cy.get('textarea').type(randomString)   
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-7]) 
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

it('CY42 Create a new Draft Post (Invalid Data)', () => {
    const testId = 'CY42'
    let screenshotId = 1
    let randomString= invalidDataPool[8] 
    cy.get('textarea').type(randomString)   
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-8]) 
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

it('CY43 Create a new Draft Post (Invalid Data)', () => {
    const testId = 'CY43'
    let screenshotId = 1
    let randomString= invalidDataPool[9] 
    cy.get('textarea').type(randomString)   
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-9]) 
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

it('CY44 Create a new Draft Post (Invalid Data)', () => {
    const testId = 'CY44'
    let screenshotId = 1
    let randomString= invalidDataPool[10] 
    cy.get('textarea').type(randomString)   
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-11]) 
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

it('CY45 Create a new Draft Post (Invalid Data)', () => {
    const testId = 'CY45'
    let screenshotId = 1
    let randomString= invalidDataPool[12] 
    cy.get('textarea').type(randomString)   
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-12]) 
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

it('CY46 Create a new Draft Post (Invalid Data)', () => {
    const testId = 'CY46'
    let screenshotId = 1
    let randomString= invalidDataPool[13] 
    cy.get('textarea').type(randomString)   
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-13]) 
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

it('CY47 Create a new Draft Post (Invalid Data)', () => {
    const testId = 'CY47'
    let screenshotId = 1
    let randomString= invalidDataPool[14] 
    cy.get('textarea').type(randomString)   
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-14]) 
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

it('CY48 Create a new Draft Post (Invalid Data)', () => {
    const testId = 'CY48'
    let screenshotId = 1
    let randomString= invalidDataPool[15] 
    cy.get('textarea').type(randomString)   
    cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)     
    cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(invalidDataPool[-15]) 
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

})