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

    it('create_customer with valid data and auth', () => {
        let cusData = customerData.createCustomer
        cusData.id = `${newid}`
        cy.postCall('http://localhost:8080/api', customerData.createCustomer)
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq("customer created")
                cy.wait(15000)
                cy.getCall(`http://localhost:8080/api?id=3`)
                    .should((response) => {
                        expect(response.status).to.eq(200)
                        expect(response.body.sms_sent).to.deep.equal(true)
                    })
            })
    })
    it('create_customer with valid data and invalid auth', () => {
        let cusData = customerData.createCustomer
        cusData.id = `${newid}`
        cy.postCall('http://localhost:8080/api', customerData.createCustomer, { 'x-session-token': "notvalidtoken" })
            .should((response) => {
                expect(response.status).to.eq(403)
            })
    })
    //multiple validation for name
    for (let i = 0; i < 2; i++) {
        let name = [{ "name": "Dharma", "code": 200 }, { "name": "Dharma11", "code": 400 },]
        it(`create_customer with valid customer name and invalid customer name-${name[i].name}`, () => {
            let cusData = customerData.createCustomer
            cusData.id = `${faker.number.int()}`
            cusData.name = name[i].name
            cy.postCall('http://localhost:8080/api', customerData.createCustomer)
                .should((response) => {
                    expect(response.status).to.eq(name[i].code)

                })
        })
    }

    it('create_customer with invalid phonumber', () => {
        let cusData = customerData.createCustomer
        cusData.id = `${faker.number.int()}`
        cusData.name = `${faker.name.firstName()}`
        cusData.phone_number = '909090909090'
        cy.postCall('http://localhost:8080/api', customerData.createCustomer)
            .should((response) => {
                expect(response.status).to.eq(500)
                expect(response.body.error).to.eq('CHECK constraint failed: length(phone_number) = 10')

            })
    })

    it('create_customer with null values', () => {
        let cusData = customerData.createCustomer
        cusData.id = null
        cusData.name = null
        cusData.phone_number = null
        cy.postCall('http://localhost:8080/api', customerData.createCustomer)
            .should((response) => {
                expect(response.status).to.eq(400)

            })
    })





})