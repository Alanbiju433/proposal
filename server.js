// Save as: server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // Echo the message back
    ws.send('Love: ' + message);
  });
  ws.send('Hello! You are connected to the WebSocket server.');
});

console.log('WebSocket server running on ws://localhost:8080');
