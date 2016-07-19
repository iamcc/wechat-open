import test from 'ava';
import Component from '..';
import { newComponent } from './lib/helper';

test('index.js', (t) => {
  const component = newComponent();

  t.is(typeof component.getAccessToken, 'function');
  t.is(typeof component.createPreAuthCode, 'function');
  t.is(typeof component.queryAuth, 'function');
  t.is(typeof component.getAuthorizerToken, 'function');
  t.is(typeof component.getAuthorizerInfo, 'function');
  t.is(typeof component.getAuthorizerOption, 'function');
  t.is(typeof component.setAuthorizerOption, 'function');
  t.is(typeof component.getApiUrl, 'function');
  t.is(typeof component.checkToken, 'function');
  t.is(typeof component.request, 'function');
});
