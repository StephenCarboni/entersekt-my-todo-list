const app = require('./app');

const httpServer = require('http').createServer(app);
httpServer.listen('8080');

