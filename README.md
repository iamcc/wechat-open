# 微信 Open 平台 SDK

## 使用
```
const opts = { appId, appSecret, verifyTicket };
const getToken = async () => {
  return await Token.findByAppID(appId);
};
const saveToken = async (newToken) => {
  let token = await Token.findByAppID(appId);
  if (!!token) {
    Object.assign(token, newToken);
    await token.save();
  } else {
    token = await Token.create(newToken);
  }

  return {
    accessToken: newToken.component_access_token,
    expiresIn: newToken.expires_in,
    expiresAt: (new Date().getTime()) + ((newToken.expires_in - 10) * 1000),
  };
};
const component = new Component(opts, getToken, saveToken);

const accessToken = await component.getAccessToken();
```

## Error
```
Error {
  name: 'WechatComponentError',
  code: Number,
  message: String,
}
```

错误名称为 `WechatComponentError`  
错误代码 `code` 可以为空，不为空时返回微信的错误代码  
错误信息 `message` 具体的错误信息