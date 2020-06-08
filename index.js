const http = require('http');
const app = require('./app');

const server = http.createServer(app);

port = process.env.PORT || 5000;

server.listen(port);