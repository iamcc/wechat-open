import 'isomorphic-fetch';
import Component from './lib/component';

export default Component;

Object.assign(Component.prototype, {
  getAccessToken: require('./lib/api_component_token'),
  createPreAuthCode: require('./lib/api_create_preauthcode'),
  queryAuth: require('./lib/api_query_auth'),
  getAuthorizerToken: require('./lib/api_authorizer_token'),
  getAuthorizerInfo: require('./lib/api_get_authorizer_info'),
  getAuthorizerOption: require('./lib/api_get_authorizer_option'),
  setAuthorizerOption: require('./lib/api_set_authorizer_option'),
});