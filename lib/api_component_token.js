/**
 * @return
 * {
 *   "component_access_token":"61W3mEpU66027wgNZ_MhGHNQDHnFATkDa9-2llqrMBjUwxRSNPbVsMmyD-yq8wZETSoE5NQgecigDrSHkPtIYA", 
 *   "expires_in":7200
 * }
 */
module.exports = function() {
  const url = this.getApiUrl('api_component_token');

  return this.request(url, {
    component_appid: this.appId,
    component_appsecret: this.appSecret,
    component_verify_tickey: this.verifyTicket,
  });
};
