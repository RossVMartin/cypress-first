/// <reference types="Cypress" />

function getDivs() {
    cy.get('.figure').each((divItem, divIndex, divList) => {
        cy.get(divItem).as('HoverDiv' + divIndex)
    })

    cy.get('.figcaption').each((divItem, divIndex, divList) => {
        cy.get(divItem).as('CaptionDiv' + divIndex)
    })   
  
}

describe('hover page', () => {
    it('All caption divs start off hidden', () => {
        cy.visit('https://the-internet.herokuapp.com/hovers');
        getDivs();


        for (let i = 0; i < 3; i++) {
            cy.get("@CaptionDiv" + i).should('be.hidden');
        }
            
    });

    it('All caption divs display when the related image is hovered over [realHover]', () => {
        cy.visit('https://the-internet.herokuapp.com/hovers');
        getDivs();

        for (let i = 0; i < 3; i++) {
            //cy.get("@HoverDiv" + i).find('img').trigger("mouseover");
            //cy.get("@HoverDiv" + i).invoke('trigger', 'mouseover');
            // I couldn't work out how to do this hovering without using an additional package called cypress-real-events
            // https://github.com/dmtrKovalenko/cypress-real-events
            // If you move your mouse with the Cypress window focused while running this test then it will fail too :/
            cy.get("@HoverDiv" + i).realHover();
            //cy.wait(50);
            cy.get("@CaptionDiv" + i).should('be.visible');
        }

    });

    it('All caption divs display when the related image is hovered over [forcing the element to show]', () => {
        cy.visit('https://the-internet.herokuapp.com/hovers');
        getDivs();

        for (let i = 0; i < 3; i++) {
            //cy.get("@HoverDiv" + i).find('img').trigger("mouseover");
            //cy.get("@HoverDiv" + i).invoke('trigger', 'mouseover');
            // I don't see the point in this test, but this is a concept that can be used to imitate hovering in cypress
            cy.get("@CaptionDiv" + i).invoke('show');
            cy.wait(1000)
            cy.get("@CaptionDiv" + i).should('be.visible');
            cy.get("@CaptionDiv" + i).invoke('hide');
        }

    });

    it('The name is correct in each caption', () => {
        cy.visit('https://the-internet.herokuapp.com/hovers');
        getDivs();

        for (let i = 0; i < 3; i++) {
            cy.get("@CaptionDiv" + i).find('h5').should('contain', 'user' + String(i+1));
        }
    });

    it('The URL is correct in each caption', () => {
        cy.visit('https://the-internet.herokuapp.com/hovers');
        getDivs();

        for (let i = 0; i < 3; i++) {
            cy.get("@CaptionDiv" + i)
                .find('a')
                .should('have.prop', 'href')
                .and('equal',`https://the-internet.herokuapp.com/users/${String(i+1)}`);
        }
    });

});