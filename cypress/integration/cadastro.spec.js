/// <reference types="cypress" />

// Biblioteca para trazer dados aleatórios
let Chance = require('chance');
let chance = new Chance();


context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        // rotas
        //POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        cy.server()
        cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**').as('postNewtable');

        cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**' ).as('postUsertable');

        cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**').as('getNewtable');

        // baseUrl + Register.html
        cy.visit('Register.html');

        // Type -> Incluir um texto no campo
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

        // Click
        cy.get('button#submitbtn').click();


        // Logs de XHR -> Resposta do Servidor
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
});




// elementos
//input[value=FeMale]
//input[type=checkbox]

//select#Skills
//select#countries
//select#country

//select#yearbox
//select[ng-model^=monthbox]
//select#daybox

//input#firstpassword
//input#secondpassword