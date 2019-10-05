// https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

import WebSocket from 'websocket';
import http from 'http';

const WebSocketServer = WebSocket.server;

function WServer() {
  this.connection_pool = [];

  this.server = http.createServer(() => {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
  });

  // create the server
  this.wsServer = new WebSocketServer({
    httpServer: this.server,
  });

  // WebSocket server
  this.wsServer.on('request', request => {
    const connection = request.accept(null, request.origin);
    this.handleConnect(connection);

    connection.on('close', handler => this.handleDisconnect(handler));
  });
}

WServer.prototype.listen = function listen(port) {
  this.server.listen(port, () => {}); // no-op
};

WServer.prototype.handleConnect = function handleConnect(connection) {
  this.connection_pool.push(connection);
};

WServer.prototype.handleDisconnect = function handleDisconnect(connection) {
  const index = this.connection_pool.indexOf(connection);
  if (index > -1) {
    this.connection_pool.splice(index, 1);
  }
};

WServer.prototype.send = function send(data) {
  this.connection_pool.forEach(connection =>
    connection.sendUTF(JSON.stringify(data))
  );
};

module.exports = WServer;
