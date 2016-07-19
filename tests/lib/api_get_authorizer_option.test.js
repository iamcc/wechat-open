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
    "authorizer_appid": "wx7bc5ba58cabd00f4",
    "option_name": "voice_recognize",
    "option_value": "1"
  };
  const component = newComponent();
  t.context.sandbox.stub(component, 'checkToken').returns({
    accessToken: 'mock',
  });
  fetchMock.mock(
    component.getApiUrl('api_get_authorizer_option', 'mock'),
    mockRst,
  );
  const rst = await component.getAuthorizerOption();
  t.deepEqual(rst, mockRst);
});