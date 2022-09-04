describe('Auth (e2e)',()=>{
    it('sould load and redirect to /signin',()=>{
        cy.visit('http://localhost:3000')
        cy.url().should('include','signin')
    })
    it('should have default initial state',()=>{
        
    })

})