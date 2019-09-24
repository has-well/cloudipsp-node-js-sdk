'use strict'

const CloudIpsp = require('../lib')

const fondy = new CloudIpsp(
  {
    merchantId: 1396424,
    secretKey: 'test'
  }
)
const data = {
  order_desc: 'test order',
  currency: 'USD',
  amount: '1000',
  card_number: '4444555566661111',
  cvv2: '222',
  expiry_date: '1232'
}
fondy.PciDssOne(data).then(data => {
  console.log(data)
}).catch((error) => {
  console.log(error)
})
