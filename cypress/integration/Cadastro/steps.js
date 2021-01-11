/// <reference types="cypress" />

// Biblioteca para trazer dados aleatórios
let Chance = require('chance');
let chance = new Chance();


When(/^informar meus dados$/, () => {
    cy.get('input[placeholder="First Name"]').type(chance.first());
    cy.get('input[ng-model^=Last]').type(chance.last());
    cy.get('input[ng-model^=Email]').type(chance.email());
    cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false}));

    // Check -> radios e checkboxes
    cy.get('input[value=FeMale]').check();
    cy.get('input[type=checkbox]').check('Cricket');
    cy.get('input[type=checkbox]').check('Hockey');

    // Select -> Combos
    cy.get('select#Skills').select('Javascript');
    cy.get('select#countries').select('Argentina');
    cy.get('select#country').select('Australia', { force: true});
    cy.get('select#yearbox').select('1996');
    cy.get('select[ng-model^=monthbox]').select('February');
    cy.get('select#daybox').select('24');

    cy.get('input#firstpassword').type('Agilizei@2020');
    cy.get('input#secondpassword').type('Agilizei@2020');

    // attachFile -> input file
    cy.get('input#imagesrc').attachFile('testes.png');
});

When(/^salvar$/, () => {
    // Click
    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
	cy.wait('@postNewtable').then((restNewtable) => {
        //Chai
        expect(restNewtable.status).to.eq(200)
    })

    cy.wait('@postUsertable').then((restUsertable) => {
        expect(restUsertable.status).to.eq(200)
    })

    cy.wait('@getNewtable').then((restNewtable) => {
        expect(restNewtable.status).to.eq(200)
    })

    //Validação de URL da página após finalizar o cadastro
    cy.url().should('contain', 'WebTable')

});

