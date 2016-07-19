/**
 * @return
 * {
 *   "pre_auth_code":"Cx_Dk6qiBE0Dmx4EmlT3oRfArPvwSQ-oa3NL_fwHM7VI08r52wazoZX2Rhpz1dEw",
 *   "expires_in":600
 * }
 */
module.exports = async function() {
  const token = await this.checkToken();
  const url = this.getApiUrl('api_create_preauthcode', token.accessToken);

  return this.request(url, {
    component_appid: this.appId,
  });
};
