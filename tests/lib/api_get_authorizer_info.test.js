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
  const mockRst ={
    "authorizer_info": {
      "nick_name": "微信SDK Demo Special",
      "head_img": "http://wx.qlogo.cn/mmopen/GPyw0pGicibl5Eda4GmSSbTguhjg9LZjumHmVjybjiaQXnE9XrXEts6ny9Uv4Fk6hOScWRDibq1fI0WOkSaAjaecNTict3n6EjJaC/0",
      "service_type_info": {
        "id": 2
      },
      "verify_type_info": {
        "id": 0
      },
      "user_name": "gh_eb5e3a772040",
      "business_info": {
        "open_store": 0,
        "open_scan": 0,
        "open_pay": 0,
        "open_card": 0,
        "open_shake": 0
      },
      "alias": "paytest01"
    },
    "qrcode_url": "URL",
    "authorization_info": {
      "appid": "wxf8b4f85f3a794e77",
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
    component.getApiUrl('api_get_authorizer_info', 'mock'),
    mockRst
  );
  const rst = await component.getAuthorizerInfo();
  t.deepEqual(rst, mockRst);
});