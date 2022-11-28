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
    
}

getTitles();
getBlogText();
getInvalidData();

const baseUrl = Cypress.env('ghostVersion') || 'new';
describe('Sign In', () => {
    beforeEach(() => {
        cy.visit('/ghost/#/signin');
        cy.get('input[name="identification"]').type(Cypress.env('username'))
        cy.get('input[name="password"]').type(Cypress.env('password'))
        cy.get('.gh-btn-login').click()
        cy.contains('a','Tags').click()
        cy.wrap(Math.floor(Math.random() * 89999 + 10000)).as("randomInt");
    })


    /*it('CY09 Create a new tag Successfully ', () => {
        const testId = 'CY70';
        let screenshotId = 1
        cy.wait(1000)
        let randomString= titlesDataPool[0]
        cy.get('.ember-view.gh-btn.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type('New Tag')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type('Tag Test')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-main').scrollTo('top')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('a','Tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('h3',"New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)    

    })

    it('CY09 Create a new tag Successfully ', () => {
        const testId = 'CY71';
        let screenshotId = 1
        cy.wait(1000)
        let randomString= titlesDataPool[1]
        cy.get('.ember-view.gh-btn.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type('New Tag')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type('Tag Test')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-main').scrollTo('top')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('a','Tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('h3',"New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)    

    })

    it('CY09 Create a new tag Successfully ', () => {
        const testId = 'CY09'
        let screenshotId = 1
        cy.wait(1000)
        let randomString= titlesDataPool[5] 
        cy.get('.ember-view.gh-btn.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type('New Tag')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type('Tag Test')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-main').scrollTo('top')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('a','Tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('h3',"New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)    

    })
    
    it('CY10 Create a new tag Unsuccessfully: blank name ', () => {
        const testId = 'CY10'
        let screenshotId = 1
        cy.wait(1000)
        let randomString= Name_Alpha_Numeric() 
        cy.get('.ember-view.gh-btn.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type(' ')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('p','You must specify a name for the tag.').should ('be.visible')
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
            
        
    })*/

    it('CY79 Try to create a post without data', () => {
        const testId = 'CY79'
        let screenshotId = 1
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })

    it('CY80 Try to create a post with title only', () => {
        const testId = 'CY80'
        let screenshotId = 1
        let randomString= titlesDataPool[0]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })

    it('CY81 Try to save post only description', () => {
        const testId = 'CY81'
        let screenshotId = 1
        let randomString= titlesDataPool[1]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type("Description"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })
    
    it('CY82 Try to save post with title and description', () => {
        const testId = 'CY82'
        let screenshotId = 1
        let randomString= titlesDataPool[2]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type("Description"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY83 Try to save post with slug only', () => {
        const testId = 'CY83'
        let screenshotId = 1
        let randomString= titlesDataPool[3]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })
    
    it('CY84 Try to save post with title and slug', () => {
        const testId = 'CY84'
        let screenshotId = 1
        let randomString= titlesDataPool[4]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("Slug"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY85 Try to save post with title, description and slug', () => {
        const testId = 'CY85'
        let screenshotId = 1
        let randomString= titlesDataPool[5]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("Slug"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type("Description"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY86 Try to save post with description and slug', () => {
        const testId = 'CY86'
        let screenshotId = 1
        let randomString= titlesDataPool[6]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("Slug"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type("Description"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })

    it('CY87 Post with internal tags', () => {
        const testId = 'CY87'
        let screenshotId = 1
        let randomString= titlesDataPool[7]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })
    

    it('CY88 Post with internal tags', () => {
        const testId = 'CY88'
        let screenshotId = 1
        let randomString= titlesDataPool[8]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY89 Post with internal tags', () => {
        const testId = 'CY89'
        let screenshotId = 1
        let randomString= titlesDataPool[9]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY90 Post with internal tags', () => {
        const testId = 'CY90'
        let screenshotId = 1
        let randomString= titlesDataPool[10]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type("Description"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY91 Post with internal tags', () => {
        const testId = 'CY91'
        let screenshotId = 1
        let randomString= titlesDataPool[11]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY92 Post with internal tags', () => {
        const testId = 'CY92'
        let screenshotId = 1
        let randomString= titlesDataPool[12]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY93 Post with internal tags', () => {
        const testId = 'CY93'
        let screenshotId = 1
        let randomString= titlesDataPool[13]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("Slug"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY94 Post with internal tags', () => {
        const testId = 'CY94'
        let screenshotId = 1
        let randomString= titlesDataPool[14]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("Slug"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type("Description"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY95 Post with internal tags', () => {
        const testId = 'CY95'
        let screenshotId = 1
        let randomString= titlesDataPool[6]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("Slug"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type("Description"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY96 Post with internal tags', () => {
        const testId = 'CY96'
        let screenshotId = 1
        let randomString= titlesDataPool[7]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })
    

    it('CY97 Post with internal tags', () => {
        const testId = 'CY97'
        let screenshotId = 1
        let randomString= titlesDataPool[7]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })
    

    it('CY98 Post with internal and Public tags', () => {
        const testId = 'CY98'
        let screenshotId = 1
        let randomString= titlesDataPool[8]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY99 Post with internal and Public tags', () => {
        const testId = 'CY99'
        let screenshotId = 1
        let randomString= titlesDataPool[9]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY100 Post with internal and Public tags', () => {
        const testId = 'CY100'
        let screenshotId = 1
        let randomString= titlesDataPool[10]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type("Description"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY101 Post with internal and Public tags', () => {
        const testId = 'CY101'
        let screenshotId = 1
        let randomString= titlesDataPool[11]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY102 Post with internal and Public tags', () => {
        const testId = 'CY102'
        let screenshotId = 1
        let randomString= titlesDataPool[12]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY103 Post with internal and Public tags', () => {
        const testId = 'CY103'
        let screenshotId = 1
        let randomString= titlesDataPool[13]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("Slug"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY104 Post with internal and Public tags', () => {
        const testId = 'CY104'
        let screenshotId = 1
        let randomString= titlesDataPool[14]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("Slug"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type("Description"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY105 Post with internal and Public tags', () => {
        const testId = 'CY105'
        let screenshotId = 1
        let randomString= titlesDataPool[6]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-slug').type("Slug"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-description').type("Description"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button','Save').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY106 Post with internal and Public tags', () => {
        const testId = 'CY106'
        let screenshotId = 1
        let randomString= titlesDataPool[7]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Internal tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)

    })

    it('CY107 Try to create a post without data', () => {
        const testId = 'CY107'
        let screenshotId = 1
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })

    it('CY108 Try to create a post with title only', () => {
        const testId = 'CY108'
        let screenshotId = 1
        let randomString= titlesDataPool[0]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
    })

    it('CY109 Try to create a post with title only', () => {
        const testId = 'CY108'
        let screenshotId = 1
        let randomString= titlesDataPool[0]
        cy.contains('a','New Tag').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('button', 'Public tags').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('#tag-name').type("New Tag"+randomString)
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.get('.gh-btn-primary').click()
        cy.screenshot(`${baseUrl}/${testId}-${screenshotId++}`)
        cy.contains('a','New Tag').click()
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
