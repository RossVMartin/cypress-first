/// <reference types="Cypress" />

function password() {
    return cy.get('#password')
}

function username() {
    return cy.get('#username')
}

function loginBtn() {
    return cy.get('form:nth-child(3) button.radius:nth-child(3) > i.fa.fa-2x.fa-sign-in')
}

function notification() {
    return cy.get('#flash')
}


describe('login page', () => {
    it('Will not accept incorrect username', () => {
        cy.visit('https://the-internet.herokuapp.com/login');
        username().type("tomsmith2");
        password().type("SuperSecretPassword!");
        
        loginBtn().click();
        notification().should('contain', 'Your username is invalid!');

    });

    it('Will not accept incorrect password', () => {
        cy.visit('https://the-internet.herokuapp.com/login');
        username().type("tomsmith");
        password().type("SuperSecretPassword!!");
        
        loginBtn().click();
        notification().should('contain', 'Your password is invalid!');

    });

    it('Will accept correct login info', () => {
        cy.visit('https://the-internet.herokuapp.com/login');
        username().type("tomsmith");
        password().type("SuperSecretPassword!");
        
        loginBtn().click();
        notification().should('contain', 'You logged into a secure area!');

    });
});