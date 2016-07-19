/**
 * @return
 * "authorization_info": {
 *   "authorizer_appid": "wxf8b4f85f3a794e77",
 *   "authorizer_access_token": "QXjUqNqfYVH0yBE1iI_7vuN_9gQbpjfK7hYwJ3P7xOa88a89-Aga5x1NMYJyB8G2yKt1KCl0nPC3W9GJzw0Zzq_dBxc8pxIGUNi_bFes0qM",
 *   "expires_in": 7200,
 *   "authorizer_refresh_token": "dTo-YCXPL4llX-u1W1pPpnp8Hgm4wpJtlR6iV0doKdY",
 * 
 * 公众号授权给开发者的权限集列表，ID为1到15时分别代表：
 * 消息管理权限
 * 用户管理权限
 * 帐号服务权限
 * 网页服务权限
 * 微信小店权限
 * 微信多客服权限
 * 群发与通知权限
 * 微信卡券权限
 * 微信扫一扫权限
 * 微信连WIFI权限
 * 素材管理权限
 * 微信摇周边权限
 * 微信门店权限
 * 微信支付权限
 * 自定义菜单权限

 * 请注意：
 * 1）该字段的返回不会考虑公众号是否具备该权限集的权限（因为可能部分具备），请根据公众号的帐号类型和认证情况，来判断公众号的接口权限。
 *   "func_info": [{
 *     "funcscope_category": {
 *       "id": 1
 *     }
 *   }, {
 *     "funcscope_category": {
 *       "id": 2
 *     }
 *   }, {
 *     "funcscope_category": {
 *       "id": 3
 *     }
 *   }]
 * }
 */
module.exports = async function(code) {
  const token = await this.checkToken();
  const url = this.getApiUrl('api_query_auth', token.accessToken);

  return this.request(url, {
    component_appid: this.appId,
    authorization_code: code,
  });
};
