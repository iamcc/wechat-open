import test from 'ava';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
import Component from '../..';
import { newComponent } from './helper';

test.beforeEach(t => {
  t.context.sandbox = sinon.sandbox.create();
});

test.afterEach(t => {
  t.context.sandbox.restore();
});

test('throw error `invalid params`', t => {
  t.throws(() => { new Component(); }, 'invalid params');
});

test('getToken', async (t) => {
  const token = { appId: '1', appSecret: '1', verifyTicket: '1'};
  const getToken = () => (Promise.resolve(token));
  const component = new Component(token, getToken);
  t.is(await component.getToken(), token);
});

test('saveToken', async (t) => {
  const token = { appId: '1', appSecret: '1', verifyTicket: '1'};
  const saveToken = (newToken) => {
    component.token = newToken;
  };
  const component = new Component(token, null, saveToken);
  t.is(component.token, null);
  await component.saveToken(token);
  t.is(component.token, token);
})

test('default saveToken', async (t) => {
  const component = newComponent();
  const mockToken = { component_access_token: 'mock' };
  const token = await component.saveToken(mockToken);
  t.is(token.accessToken, 'mock');
});

test('getApiUrl', async (t) => {
  const component = newComponent();
  t.is(
    component.getApiUrl('api', 'token'),
    'https://api.weixin.qq.com/cgi-bin/component/api?component_access_token=token'
  );
  t.is(
    component.getApiUrl('api'),
    'https://api.weixin.qq.com/cgi-bin/component/api'
  );
});

test('checkToken', async (t) => {
  const mockToken = { mock: true };
  const component = newComponent();
  t.context.sandbox.stub(component, 'getAccessToken').returns(mockToken);
  t.context.sandbox.stub(component, 'saveToken').returns(mockToken);

  const token = await component.checkToken();
  t.true(token.mock);
});

test('checkToken return old valid token', async (t) => {
  const component = newComponent();
  component.getToken = () => (Promise.resolve({
    expiresAt: (new Date().getTime()) + 1000000,
    accessToken: 'mock',
  }));
  const token = await component.checkToken();
  t.is(token.accessToken, 'mock');
});

test('request should throw WechatComponentError', async (t) => {
  const component = newComponent();
  try {
    await component.request('http://hello.world');
  } catch (err) {
    t.is(err.name, 'WechatComponentError');
  }
});

test('request should success', async (t) => {
  const component = newComponent();
  fetchMock.mock('/mock_success', { errcode: 0 });
  const rst = await component.request('/mock_success');
  t.is(rst.errcode, 0);
  fetchMock.restore();
});

test('retry if errcode is 42001 and isRetry is false', async (t) => {
  const component = newComponent();
  const mockToken = { mock: true, accessToken: 'mock' };
  t.context.sandbox.stub(component, 'getAccessToken').returns(mockToken);
  t.context.sandbox.stub(component, 'saveToken').returns(mockToken);

  fetchMock.mock('http://mock?component_access_token=test', {
    errcode: 42001,
  });

  fetchMock.mock('http://mock?component_access_token=mock', {
    errcode: 0,
  });

  const rst = await component.request('http://mock?component_access_token=test');
  t.is(rst.errcode, 0);

  fetchMock.restore();
});

test('throw error if errcode is not 0', async (t) => {
  const component = newComponent();

  fetchMock.mock('/mock_error', { errcode: 1, errmsg: 'mock' });

  try {
    await component.request('/mock_error');
  } catch (err) {
    t.is(err.name, 'WechatComponentError');
    t.is(err.message, 'mock');
    t.is(err.code, 1);
  }

  fetchMock.restore();
});