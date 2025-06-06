const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

// Load your SSL certificate and key
const server = https.createServer({
    cert: fs.readFileSync('server.cert'),
    key: fs.readFileSync('server.key')
});

// Create WebSocket server on top of HTTPS server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('Received:', message);
        // Echo the message back
        ws.send('Love: ' + message);
    });
    ws.send('Hello! Secure WebSocket connection established.');
});

// Start HTTPS server
server.listen(8080, () => {
    console.log('WSS server running at https://localhost:8080');
});
