const CloudIpsp = require('./lib');

const tt = new CloudIpsp(
    {
        protocol: '1.0',
        merchantId: 1396424,
        baseUrl: 'api.fondy.eu',
        secretKey: "test",
        creditKey: "testcredit",
        contentType: 'json'
    }
);
let data = {

};
console.log(tt.Checkout());
