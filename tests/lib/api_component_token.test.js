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
  const component = newComponent();
  const mockRst = { mock: true };

  fetchMock.mock(
    component.getApiUrl('api_component_token'),
    mockRst
  );

  const rst = await component.getAccessToken();
  t.deepEqual(rst, mockRst);
});