const WebSocketServer = require('websocket').server;
const debug = require('debug');

let wsServer;

export default {
  build(app) {
    function originIsAllowed(origin) {
      debug.log(origin);
      return true;
    }

    wsServer = new WebSocketServer({
      httpServer: app,
      autoAcceptConnections: false
    });

    wsServer.on('request', (request) => {
      if (!originIsAllowed(request.origin)) {
        request.reject();
        return;
      }

      const connection = request.accept('echo-protocol', request.origin);
      connection.on('message', (message) => {
        if (message.type === 'utf8') {
          connection.sendUTF(message.utf8Data);
        } else if (message.type === 'binary') {
          connection.sendBytes(message.binaryData);
        }
      });
      connection.on('close', (reasonCode) => {
        debug.log(reasonCode);
        debug.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
      });
    });
  }
};

