/// <reference types="Cypress" />

function dragElement(start, end) {
    const dataTransfer = new DataTransfer;
    cy.get(start).trigger('dragstart', { dataTransfer });
    cy.get(end).trigger('drop', { dataTransfer });
    cy.get(start).trigger('dragend');
}

describe('drag and drop page', () => {
    it('You can drag and drop', () => {
        cy.visit("https://the-internet.herokuapp.com/drag_and_drop");
        dragElement('#column-a', '#column-b')
        
    });
});

