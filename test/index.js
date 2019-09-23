'use strict'

const chai = require('chai')
const expect = chai.expect
const CloudIpsp = require('../lib')

const fondy = new CloudIpsp(
  {
    protocol: '1.0',
    merchantId: 1396424,
    baseUrl: 'api.fondy.eu',
    secretKey: 'test',
    creditKey: 'testcredit',
    contentType: 'json'
  }
)

describe('Main API', function () {
  describe('Checkout', function () {
    it('create checkout url', async () => {
      const dataCheckout = {
        order_desc: 'order url',
        currency: 'USD',
        amount: '1000'
      }
      await fondy.Checkout(dataCheckout).then(data => {
        expect(data.response_status).assert('success')
        expect(data.checkout_url).to.contain('api.fondy.eu')
      })
    })
    it('create checkout token', async () => {
      const dataCheckout = {
        order_desc: 'order token',
        currency: 'USD',
        amount: '1000'
      }
      await fondy.CheckoutToken(dataCheckout).then(data => {
        expect(data.response_status).assert('success')
        expect(data.token).to.not.be.empty
      })
    })
  })
})
