const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', function connection(ws) {
  // Add new client
  clients.push(ws);

  ws.on('message', function incoming(message) {
    // Broadcast message to all other clients
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    // Remove client on disconnect
    clients = clients.filter(client => client !== ws);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
