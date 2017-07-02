const debug = require('debug')('api:ws');

const websocket = (app, ws) => {
  const wsExpress = require('express-ws')(app); //eslint-disable-line

  ws.on('message', (msg) => {
    debug(msg);
  });
};

export default websocket;

