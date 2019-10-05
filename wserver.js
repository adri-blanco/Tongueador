// https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

var WebSocketServer = require("websocket").server;
var http = require("http");

function WServer() {
  this.connection_pool = [];

  this.server = http.createServer(_ => {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
  });

  // create the server
  this.wsServer = new WebSocketServer({
    httpServer: this.server
  });

  // WebSocket server
  this.wsServer.on("request", (request) => {
    var connection = request.accept(null, request.origin);
    this.handleConnect(connection);

    connection.on("close", (handler ) => this.handleDisconnect(handler));
  });
}

WServer.prototype.listen = function(port) {
  this.server.listen(port, () => {}); // no-op
};

WServer.prototype.handleConnect = function(connection) {
  this.connection_pool.push(connection);
};

WServer.prototype.handleDisconnect = function(connection) {
  var index = this.connection_pool.indexOf(connection);
  if (index > -1) {
    this.connection_pool.splice(index, 1);
  }
};

WServer.prototype.send = function(data) {
  this.connection_pool.forEach(connection =>
    connection.sendUTF(JSON.stringify(data))
  );
};

module.exports = WServer;
