/**
 * @return
 * {
 *   "authorizer_appid": "wx7bc5ba58cabd00f4",
 *   "option_name": "voice_recognize",
 *   "option_value": "1"
 * }
 * 
 * location_report(地理位置上报选项)	0	无上报
 * 1	进入会话时上报
 * 2	每5s上报
 * voice_recognize（语音识别开关选项）	0	关闭语音识别
 * 1	开启语音识别
 * customer_service（多客服开关选项）	0	关闭多客服
 * 1	开启多客服
 */
module.exports = async function(appId, name) {
  const token = await this.checkToken();
  const url = this.getApiUrl('api_get_authorizer_option', token.accessToken);

  return this.request(url, {
    component_appid: this.appId,
    authorizer_appid: appId,
    option_name: name,
  });
};
