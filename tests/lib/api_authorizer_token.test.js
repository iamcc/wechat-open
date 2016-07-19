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
  const mockRst = {
    "authorizer_access_token": "aaUl5s6kAByLwgV0BhXNuIFFUqfrR8vTATsoSHukcIGqJgrc4KmMJ-JlKoC_-NKCLBvuU1cWPv4vDcLN8Z0pn5I45mpATruU0b51hzeT1f8",
    "expires_in": 7200,
    "authorizer_refresh_token": "BstnRqgTJBXb9N2aJq6L5hzfJwP406tpfahQeLNxX0w"
  }; 

  t.context.sandbox.stub(component, 'checkToken').returns({
    accessToken: 'mock',
  });

  fetchMock.mock(
    component.getApiUrl('api_authorizer_token', 'mock'),
    mockRst,
  );
  
  const rst = await component.getAuthorizerToken();
  t.deepEqual(rst, mockRst);

  fetchMock.restore();
});