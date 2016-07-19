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
    "authorization_info": {
      "authorizer_appid": "wxf8b4f85f3a794e77",
      "authorizer_access_token": "QXjUqNqfYVH0yBE1iI_7vuN_9gQbpjfK7hYwJ3P7xOa88a89-Aga5x1NMYJyB8G2yKt1KCl0nPC3W9GJzw0Zzq_dBxc8pxIGUNi_bFes0qM",
      "expires_in": 7200,
      "authorizer_refresh_token": "dTo-YCXPL4llX-u1W1pPpnp8Hgm4wpJtlR6iV0doKdY",
      "func_info": [{
        "funcscope_category": {
          "id": 1
        }
      }, {
        "funcscope_category": {
          "id": 2
        }
      }, {
        "funcscope_category": {
          "id": 3
        }
      }]
    }
  };
  const component = newComponent();
  t.context.sandbox.stub(component, 'checkToken').returns({
    accessToken: 'mock',
  });
  fetchMock.mock(
    component.getApiUrl('api_query_auth', 'mock'),
    mockRst,
  );
  const rst = await component.queryAuth();
  t.deepEqual(rst, mockRst);
});