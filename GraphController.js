'use strict'
const request = require('request-promise');

/*
 *  Example controller to handle Microsoft Graph Security API requests.
 */
function GraphSecurityAPI(config) {
  this.appId = config.appId;
  this.appSecret = config.appSecret;
  this.tenantId = config.tenantId;
  this.token = null;
}

GraphSecurityAPI.prototype.storeToken = function(token) {
  this.token = token;
}

/*
 *  Creates a POST request to receive OAuth authorization token for your tenant ID.
 */
GraphSecurityAPI.prototype.getAuthenticationToken = function () {
  const options = {
    uri: `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`,
    method: 'POST',
    form: {
      client_id: this.appId,
      client_secret: this.appSecret,
      grant_type: 'client_credentials',
      scope: 'https://graph.microsoft.com/.default'
    },
    json: true
  };
  return request(options)
}

/*
 *  Creates a GET request to retrieve all security alerts.
 */
GraphSecurityAPI.prototype.getAlerts = function() {
  const options = {
    uri: 'https://graph.microsoft.com/v1.0/security/alerts',
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + this.token.access_token },
    json: true
  };
  return request(options);
}

/*
 * Creates a GET request to retrieve a single security alert.
 */
GraphSecurityAPI.prototype.getOneAlert = function(alertId) {
  const options = {
    uri: 'https://graph.microsoft.com/v1.0/security/alerts/' + alertId,
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + this.token.access_token },
    json: true
  };
  return request(options);
}

/*
 *  Creates a PATCH request to update a security alert.
 */
GraphSecurityAPI.prototype.updateAlert = function(alertId) {
  return this.getOneAlert(alertId)
    .then(alertInfo => {
      const options = {
        uri: 'https://graph.microsoft.com/v1.0/security/alerts/' + alertId,
        method: 'PATCH',
        form: {
          assignedTo: 'The Knights who say Ni',
          comments: [
            'These are sample comments being updated to the entry',
            'Rubber Baby Buggy Bumpers',
            'The only requirement for PATCH is the vendor information'
          ],
          vendorInformation: alertInfo.vendorInformation
        },
        headers: {
          'Authorization': 'Bearer ' + this.token.access_token,
          'Prefer': 'return=representation'
        },
        json: true
      };
      options.form = JSON.stringify(options.form);
      return request(options);
    })
}

module.exports = GraphSecurityAPI;