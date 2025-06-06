const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

// Read SSL certificate and key
const server = https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
});

// WebSocket server on top of HTTPS
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log('Received:', message);
  });
});

server.listen(8080, () => {
  console.log('WebSocket server is running on wss://0.0.0.0:8080');
});
