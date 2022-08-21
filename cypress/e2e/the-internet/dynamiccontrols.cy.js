/// <reference types="Cypress" />

describe('dynamic controls page', () => {

    it('The checkbox can be removed and added', () => {
        cy.visit('https://the-internet.herokuapp.com/dynamic_controls');
        cy.get('#checkbox-example').find('input').should('have.attr', 'type', 'checkbox').and('be.visible');
        cy.get('#checkbox-example').find('button').click();
        cy.get('#checkbox-example').find('input', {timeout: 5000}).should('not.exist')
        cy.get('#checkbox-example').find('#message').contains("It's gone!")
        cy.get('#checkbox-example').find('button').should('contain', 'Add').click();
        cy.get('#checkbox-example').find('#message').contains("It's back!")
        cy.get('#checkbox-example').find('input').should('have.attr', 'type', 'checkbox').and('be.visible');
    });
});