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
   "pre_auth_code":"Cx_Dk6qiBE0Dmx4EmlT3oRfArPvwSQ-oa3NL_fwHM7VI08r52wazoZX2Rhpz1dEw",
   "expires_in":600
 };
  const component = newComponent();
  t.context.sandbox.stub(component, 'checkToken').returns({
    accessToken: 'mock',
  });
  fetchMock.mock(
    component.getApiUrl('api_create_preauthcode', 'mock'),
    mockRst
  );
  const rst = await component.createPreAuthCode();
  t.deepEqual(rst, mockRst);
});