const customerData = require('../../fixtures/customer.json');
import { faker } from '@faker-js/faker';

let newid = faker.number.int()
context('customer Test suite', () => {
    it('getcustomer', () => {
        cy.getCall('http://localhost:8080/api?id=3')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('create_customer', () => {
        let cusData = customerData.createCustomer
        cusData.id = `${newid}`
        cy.postCall('http://localhost:8080/api', customerData.createCustomer)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq("customer created")
                cy.wait(15000)
                cy.getCall(`http://localhost:8080/api?id=${newid}`)
                    .should((response) => {
                        expect(response.status).to.eq(200)
                    })
            })
    })
    // it('connectBD', () => {
    //     cy.connectDB()
    // })
})