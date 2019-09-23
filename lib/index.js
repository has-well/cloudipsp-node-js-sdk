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
    const response = util.getConvertedResponse(type, data)
    if (response.response_status === 'failure') {
      throw new Error(
        'Response status is failure\n' +
         `error_code: ${response.error_code}\n` +
         `request_id: ${response.request_id}\n` +
         `error_message: ${response.error_message}\n`
      )
    } else {
      return response
    }
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

CloudIpsp.prototype.CheckoutToken = function (data) {
  const request = this.getImportantParams(data)

  const options = {
    path: 'checkout/token/',
    body: request
  }

  return this._request(options)
}

CloudIpsp.prototype.Verification = function (data) {
  data.verification = 'Y'
  if (!data.verification_type) {
    data.verification_type = 'amount'
  }
  if (!data.amount) {
    data.amount = 0
  }
  const request = this.getImportantParams(data)
  const options = {
    path: 'checkout/url/',
    body: request
  }

  return this._request(options)
}

module.exports = CloudIpsp
