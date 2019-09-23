const CloudIpsp = require('./lib')

const tt = new CloudIpsp(
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
console.log(tt.Checkout(data))
