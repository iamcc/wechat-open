/**
 * @return
 * {
 *   "errcode":0,
 *   "errmsg":"ok"
 * }
 */
module.exports = async function(appId, name, value) {
  const token = await this.checkToken();
  const url = this.getApiUrl('api_set_authorizer_option', token.accessToken);

  return this.request(url, {
    component_appid: this.appId,
    authorizer_appid: appId,
    option_name: name,
    option_value: value,
  });
};
