"use strict";

const util = require('./util');
const request = require('request');

class CloudIpsp {
    /**
     * Base class
     * @param protocol
     * @param merchantId
     * @param baseUrl
     * @param secretKey
     * @param creditKey
     * @param contentType
     * @param timeout
     */
    constructor({
                    protocol = '1.0',
                    merchantId,
                    baseUrl = 'api.fondy.eu',
                    secretKey,
                    creditKey,
                    contentType = 'json',
                    timeout = 60 * 1000
                }) {
        this.config = {
            protocol,
            merchantId,
            baseUrl,
            secretKey,
            creditKey,
            contentType,
            timeout
        };
        if (!this.config.merchantId || isNaN(this.config.merchantId)) throw new Error('Merchant id incorrect');
        if (!this.config.secretKey) throw new Error('Secret Key is empty');
    }

    /**
     * Gen order id
     */
    getOrderId() {
        return `${this.config.merchantId}_${util.generateOrderId()}`;
    }

    /**
     * Base request
     * @param url
     * @param method
     * @param body
     * @returns {Promise<any>}
     * @private
     */
    async _request({url, body = null}) {
        const headers = {
            'User-Agent': 'cloudipsp-nodejs-sdk',
            'Content-Type': util.getContentHeader(this.config.contentType),
        };

        const options = {
            hostname: this.config.baseUrl,
            path: `/api/${url}`,
            method: 'POST',
            headers,
            body: body,
            timeout: this.config.timeout,
        };

        try {
            const data = await request(options);
            return JSON.parse(data);
        } catch (e) {
            throw e;
        }
    }
};

CloudIpsp.prototype.Checkout = async function (data) {
    const url = '/checkout/url/';
    await this._request({url, data});
};

module.exports = CloudIpsp;
