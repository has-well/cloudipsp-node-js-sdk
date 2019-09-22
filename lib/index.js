const util = require('./util');
const request = require('request');

module.exports = class CloudIpsp {
    /**
     *
     * @param protocol
     * @param merchantId
     * @param baseUrl
     * @param secretKey
     * @param creditKey
     * @param contentType
     */
    constructor({
                    protocol = '1.0',
                    merchantId,
                    baseUrl = 'api.fondy.eu',
                    secretKey,
                    creditKey,
                    contentType = 'json'
                }) {
        this.config = {
            protocol,
            merchantId,
            baseUrl,
            secretKey,
            creditKey,
            contentType
        };
    }
};
