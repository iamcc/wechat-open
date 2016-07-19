import qs from 'querystring';

class WechatComponentError extends Error {
  constructor(msg, code) {
    super(msg);
    this.code = code;
    this.name = 'WechatComponentError';
  }
}

function replaceAccessToken(url, accessToken) {
  const idx = url.indexOf('?');

  if (idx === -1) {
    return url;
  }

  const query = qs.parse(url.substr(idx + 1));
  query.component_access_token = accessToken;

  return `${url.substr(0, idx + 1)}${qs.stringify(query)}`;
}

export default class Component {
  constructor({ appId, appSecret, verifyTicket } = {}, getToken, saveToken) {
    if (!(appId && appSecret && verifyTicket)) {
      throw new WechatComponentError('invalid params');
    }

    Object.assign(this, { appId, appSecret, verifyTicket });

    this.token = null;
    this.getToken = getToken || (() => (Promise.resolve(this.token)));
    this.saveToken = saveToken || ((newToken) => (Promise.resolve({
      accessToken: newToken.component_access_token,
      expiresIn: newToken.expires_in,
      expiresAt: ((new Date()).getTime() + ((newToken.expires_in - 10) * 1000)),
    })));
  }

  getApiUrl(api, token) {
    const prefix = 'https://api.weixin.qq.com/cgi-bin/component/';

    if (!token) {
      return `${prefix}${api}`;
    }

    return `${prefix}${api}?component_access_token=${token}`;
  }

  async checkToken() {
    this.token = await this.getToken();
    if (!!this.token && (new Date()).getTime() < this.token.expiresAt) {
      return this.token;
    }

    const newToken = await this.getAccessToken();
    this.token = await this.saveToken(newToken);
    return this.token;
  }

  async request(url, body, isRetry) {
    let rst = null;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });

      rst = await res.json();
    } catch (err) {
      throw new WechatComponentError(err.message);
    }

    if (rst.errcode) {
      if (rst.errcode === 42001 && !isRetry) {
        const newToken = await this.getAccessToken();
        this.token = await this.saveToken(newToken);
        const newUrl = replaceAccessToken(url, this.token.accessToken);
        return this.request(newUrl, body, true);
      }

      throw new WechatComponentError(rst.errmsg, rst.errcode);
    }

    return rst;
  }
}
