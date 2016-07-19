/**
 * @return
 * {
 *   "authorizer_access_token": "aaUl5s6kAByLwgV0BhXNuIFFUqfrR8vTATsoSHukcIGqJgrc4KmMJ-JlKoC_-NKCLBvuU1cWPv4vDcLN8Z0pn5I45mpATruU0b51hzeT1f8",
 *   "expires_in": 7200,
 *   "authorizer_refresh_token": "BstnRqgTJBXb9N2aJq6L5hzfJwP406tpfahQeLNxX0w"
 * }
 */
module.exports = async function(appId, refreshToken) {
  const token = await this.checkToken();
  const url = this.getApiUrl('api_authorizer_token', token.accessToken);

  return this.request(url, {
    component_appid: this.appId,
    authorizer_appid: appId,
    authorizer_refresh_token: refreshToken,
  });
};
