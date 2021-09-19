const http = require('http');
const server = http.createServer();
server.listen(9898);

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    server: server
});

wss.on('connection', function connection(ws, req){
    ws.on('message', function(message) {
      console.log('received: %s', message);
      wss.clients.forEach(client => client.send('' + message));
    });
});

