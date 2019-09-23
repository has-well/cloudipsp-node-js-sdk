const CloudIpsp = require('./lib')

const fondy = new CloudIpsp(
  {
    protocol: '1.0',
    merchantId: 1396424,
    baseUrl: 'api.fondy.eu',
    secretKey: 'test',
    creditKey: 'testcredit',
    contentType: 'form'
  }
)
const data = {
  order_desc: 'test order',
  currency: 'USD',
  amount: '125'
}
fondy.Checkout(data).then(data => {
  console.log(data)
})
