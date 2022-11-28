const { faker } = require("@faker-js/faker");

const scenes = [
  {
    id: 'VISIT_MEMBER_OPTION',
    childs: [
      'CREATE_MEMBER',
      'GETTING_LAST_MEMBER'
    ]
  },
  {
    id: 'CREATE_MEMBER',
    childs: [
      'RETRY_SAVE_MEMBER'
    ]
  },
  {
    id: 'DELETE_LAST_MEMBER',
    childs: [
      'VALIDATING_REMOVING_MEMBER',
      'CANCELLING_REMOVING_MEMBER'
    ]
  },
  {
    id: 'GETTING_LAST_MEMBER',
    childs: [
      'DELETE_LAST_MEMBER'
    ]
  },
  {
    id: 'RETRY_SAVE_MEMBER',
    childs: [
      
    ]
  },
  {
    id: 'VALIDATING_REMOVING_MEMBER',
    childs: [
      
    ]
  },
  {
    id: 'CANCELLING_REMOVING_MEMBER',
    childs: [
      
    ]
  }
]

describe('', ()=>{
  beforeEach(()=>{
          cy.request('POST', '/ghost/api/admin/session', {
            username: Cypress.env('username'),
            password: Cypress.env('password')
          })
        })
  for (let i = 0; i < 15; i++) {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    console.log(name)
    console.log(email)
    const deepLevel = getRandomInt(3) + 1
    it(`Test #${i}A`, ()=> {
      visitMemberOption()
      recursiveChilds('VISIT_MEMBER_OPTION', deepLevel, 0, name, email)
    })
  }
  for (let i = 0; i < 15; i++) {
    const name = faker.name.fullName();
    const email = faker.name.fullName();
    console.log(name)
    console.log(email)
    const deepLevel = getRandomInt(3) + 1
    it(`Test #${i}B`, ()=> {
      visitMemberOption()
      recursiveChilds('VISIT_MEMBER_OPTION', deepLevel, 0, name, email)
    })
  }
})

function recursiveChilds(key, deepLevel, counter, name, email){
  const event = scenes.find(scene => scene.id == key)
  console.log(event)
  if(event.childs.length == 0)
    return null
  if (counter == deepLevel)
    return null
  const newEvent = gettingRandomEvent(event.childs)
  switch (newEvent) {
    case 'VISIT_MEMBER_OPTION':
      visitMemberOption()
      break;
    case 'CREATE_MEMBER':
      createMember(name, email)
      break;
    case 'DELETE_LAST_MEMBER':
      deleteLastMember()
      break;
    case 'GETTING_LAST_MEMBER':
      gettingLastMember()
      break;
    case 'RETRY_SAVE_MEMBER':
      retrySaveMember(name, email)
      break;
    case 'VALIDATING_REMOVING_MEMBER':
      validatingRemovingMember()
      break;
    case 'CANCELLING_REMOVING_MEMBER':
      cancellingRemovingMmeber()
      break;  
    default:
      break;
  }
  counter++;
  return recursiveChilds(newEvent, deepLevel, counter, name, email)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function gettingRandomEvent(childs){
  return childs[getRandomInt(childs.length)]
}

function visitMemberOption(){
  cy.visit('/ghost/dashboard')
      cy.wait(1000)
      
      cy.contains('li','Members').click()
}

function createMember(name, email){
      cy.contains('a > span', 'New member').click()
      
      cy.get('#member-name').type(name)
      
      cy.get('#member-email').type(email)
      
      cy.contains('button > span', 'Save').click()

      cy.on('uncaught:exception', (err, runnable) => {
        return false
      })
      
      cy.wait(1000)
}

function deleteLastMember(){
      cy.get('.view-actions button:first').click()
      
      cy.contains('span','Delete member').click()
      
      cy.wait(1000)
      
}

function validatingRemovingMember(){
  cy.get('.epm-modal-container .modal-footer').contains('button > span', 'Delete member').click()
      
      cy.wait(1000)
  cy.get('.epm-modal-container .modal-footer').contains('button > span','Leave').click()
      
      cy.wait(1000)
      cy.url().should('include','/ghost/#/members')
}

function cancellingRemovingMmeber(){

      cy.get('.epm-modal-container .modal-footer').contains('button > span', 'Delete member').click()
      
      cy.wait(1000)
      cy.get('.epm-modal-container .modal-footer').contains('button > span', 'Cancel').click()
      
      cy.wait(1000)
      cy.get('.epm-modal-container').should('not.exist')
}


function gettingLastMember(){
  cy.get('tr > a:first').click()
}

function retrySaveMember(name, email){

  cy.get('#member-email').clear().type("test")
  cy.get('#member-name').clear().type(name)  
  cy.contains('button > span', 'Save').click()
  cy.get('#member-email').clear().type(email)
  cy.get('#member-name').clear().type(name)  
  cy.contains('button > span', 'Retry').click()
}