/**
 * @return
 * {
 *   "authorizer_info": {
 *     "nick_name": "微信SDK Demo Special",
 *     "head_img": "http://wx.qlogo.cn/mmopen/GPyw0pGicibl5Eda4GmSSbTguhjg9LZjumHmVjybjiaQXnE9XrXEts6ny9Uv4Fk6hOScWRDibq1fI0WOkSaAjaecNTict3n6EjJaC/0",
 * 
 *      授权方公众号类型，0代表订阅号，1代表由历史老帐号升级后的订阅号，2代表服务号
 *     "service_type_info": {
 *       "id": 2
 *     },
 * 
 *      授权方认证类型，
 *      -1代表未认证，
 *      0代表微信认证，
 *      1代表新浪微博认证，
 *      2代表腾讯微博认证，
 *      3代表已资质认证通过但还未通过名称认证，
 *      4代表已资质认证通过、还未通过名称认证，但通过了新浪微博认证，
 *      5代表已资质认证通过、还未通过名称认证，但通过了腾讯微博认证
 *     "verify_type_info": {
 *       "id": 0
 *     },
 * 
 *      授权方公众号的原始ID
 *     "user_name": "gh_eb5e3a772040",
 * 
 *      用以了解以下功能的开通状况（0代表未开通，1代表已开通）：
 *      open_store:是否开通微信门店功能
 *      open_scan:是否开通微信扫商品功能
 *      open_pay:是否开通微信支付功能
 *      open_card:是否开通微信卡券功能
 *      open_shake:是否开通微信摇一摇功能
 *     "business_info": {
 *       "open_store": 0,
 *       "open_scan": 0,
 *       "open_pay": 0,
 *       "open_card": 0,
 *       "open_shake": 0
 *     },
 * 
 *      授权方公众号所设置的微信号，可能为空
 *     "alias": "paytest01"
 *   },
 *   "qrcode_url": "URL",
 *   "authorization_info": {
 *     "appid": "wxf8b4f85f3a794e77",
 * 
 *      公众号授权给开发者的权限集列表，ID为1到15时分别代表：
 *       消息管理权限
 *       用户管理权限
 *       帐号服务权限
 *       网页服务权限
 *       微信小店权限
 *       微信多客服权限
 *       群发与通知权限
 *       微信卡券权限
 *       微信扫一扫权限
 *       微信连WIFI权限
 *       素材管理权限
 *       微信摇周边权限
 *       微信门店权限
 *       微信支付权限
 *       自定义菜单权限
 *
 *       请注意：
 *       1）该字段的返回不会考虑公众号是否具备该权限集的权限（因为可能部分具备），请根据公众号的帐号类型和认证情况，来判断公众号的接口权限。           
 *     "func_info": [{
 *       "funcscope_category": {
 *         "id": 1
 *       }
 *     }, {
 *       "funcscope_category": {
 *         "id": 2
 *       }
 *     }, {
 *       "funcscope_category": {
 *         "id": 3
 *       }
 *     }]
 *   }
 * }
 */
module.exports = async function(appId) {
  const token = await this.checkToken();
  const url = this.getApiUrl('api_get_authorizer_info', token.accessToken);

  return this.request(url, {
    component_appid: this.appId,
    authorizer_appid: appId,
  });
};
