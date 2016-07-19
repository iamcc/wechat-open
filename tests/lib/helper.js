import Component from '../..';

function random() {
  return Math.random().toString().slice(-10);
}

export function newComponent() {
  const appId = `appId${random()}`;
  const appSecret = `appSecret${random()}`;
  const verifyTicket = `verifyTicket${random()}`;
  const component = new Component({ appId, appSecret, verifyTicket });

  return component;
}