'use strict'
const crypto = require('crypto')
const querystring = require('querystring')

/**
 * Generate sha1 sign
 * @param data
 * @param secret
 * @returns {string}
 */
function genSignature (data, secret) {
  const ordered = {}
  Object.keys(data).sort().forEach(function (key) {
    if (data[key] !== '') {
      ordered[key] = data[key]
    }
  })
  const signString = secret + '|' + Object.values(ordered).join('|')
  return crypto.createHash('sha1').update(signString).digest('hex')
}

/**
 * Get order id
 */
function generateOrderId () {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (var i = 0; i < 40; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/**
 * Get content type
 */
function getContentHeader (type) {
  switch (type) {
    case 'json':
      return 'Content-type: application/json; charset=utf-8'
    case 'form':
      return 'Content-type: application/x-www-form-urlencoded'
    default:
      throw new Error('Type not supported')
  }
}

/**
 * Get converted data
 */
function getConvertedData (type, data) {
  switch (type) {
    case 'json':
      return JSON.stringify({ request: data })
    case 'form':
      return querystring.stringify(data)
    default:
      throw new Error('Type not supported')
  }
}

/**
 * Get converted response
 */
function getConvertedResponse (type, data) {
  switch (type) {
    case 'json':
      return JSON.parse(data)
    case 'form':
      return querystring.parse(data)
    default:
      throw new Error('Type not supported')
  }
}

module.exports = {
  genSignature,
  getConvertedData,
  generateOrderId,
  getContentHeader,
  getConvertedResponse
}
