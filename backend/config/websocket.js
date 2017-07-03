import expressws from 'express-ws';

const debug = require('debug')('api:ws');

const websocket = (app) => {
  const decoratedws = expressws(app);
  app.ws('/ws', (ws) => {
    ws.on('message', (msg) => {
      debug(msg);
    });
  });
  return decoratedws.app;
};

export default websocket;

