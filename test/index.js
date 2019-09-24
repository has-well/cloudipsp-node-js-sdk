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
        expect(data.response_status).equal('success')
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
        expect(data.response_status).equal('success')
        expect(data.token).to.not.be.empty
      })
    })
    it('create verification url', async () => {
      const dataVerification = {
        order_desc: 'order token',
        currency: 'USD'
      }
      await fondy.Verification(dataVerification).then(data => {
        expect(data.response_status).equal('success')
        expect(data.checkout_url).to.not.be.empty
      })
    })
    it('capture order', async () => {
      const dataApprovedOrder = {
        order_desc: 'test order',
        currency: 'USD',
        amount: '1000',
        card_number: '4444555511116666',
        cvv2: '333',
        expiry_date: '1232',
        preauth: 'Y'
      }
      const orderId = await fondy.PciDssOne(dataApprovedOrder).then(data => {
        return data.order_id
      })
      const captureData = {
        currency: 'USD',
        amount: '1000',
        order_id: orderId
      }
      await fondy.Capture(captureData).then(dataC => {
        expect(dataC.response_status).equal('success')
        expect(dataC.capture_status).equal('captured')
      })
    })
  })
})
