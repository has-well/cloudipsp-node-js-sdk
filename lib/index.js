'use strict'

const util = require('./util')
const request = require('./requester')

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
  constructor ({
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
    }
    if (!this.config.merchantId || isNaN(this.config.merchantId)) throw new Error('Merchant id incorrect')
    if (!this.config.secretKey) throw new Error('Secret Key is empty')
  }

  /**
   * Check data
   * @param data
   * @returns {*}
   */
  getImportantParams (data) {
    if (!data.order_id) { data.order_id = this.getOrderId() }
    data.merchant_id = this.config.merchantId
    data.signature = util.genSignature(data, this.config.secretKey)
    return data
  }

  /**
     * Gen order id
     */
  getOrderId () {
    return `${this.config.merchantId}_${util.generateOrderId()}`
  }

  /**
   *
   * @param path
   * @param body
   * @returns {Promise<any|ParsedUrlQuery>}
   * @private
   */
  async _request ({ path, body = null }) {
    const type = this.config.contentType

    const headers = {
      'User-Agent': 'cloudipsp-nodejs-sdk',
      'Content-Type': util.getContentHeader(type)
    }

    const options = {
      hostname: this.config.baseUrl,
      port: 443,
      path: `/api/${path}`,
      method: 'POST',
      headers,
      body: util.getConvertedData(type, body),
      timeout: this.config.timeout
    }
    const data = await request(options)

    return util.getConvertedResponse(type, data)
  }
}

CloudIpsp.prototype.Checkout = function (data) {
  const request = this.getImportantParams(data)

  const options = {
    path: 'checkout/url/',
    body: request
  }

  return this._request(options)
}

module.exports = CloudIpsp
