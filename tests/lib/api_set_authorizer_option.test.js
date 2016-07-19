import test from 'ava';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
import { newComponent } from './helper';

test.beforeEach((t) => {
  t.context.sandbox = sinon.sandbox.create();
});

test.afterEach((t) => {
  t.context.sandbox.restore();
});

test('should success', async (t) => {
  const mockRst = {
    "errcode":0,
    "errmsg":"ok"
  };
  const component = newComponent();
  t.context.sandbox.stub(component, 'checkToken').returns({
    accessToken: 'mock',
  });
  fetchMock.mock(
    component.getApiUrl('api_set_authorizer_option', 'mock'),
    mockRst,
  );
  const rst = await component.setAuthorizerOption();
  t.deepEqual(rst, mockRst);
});