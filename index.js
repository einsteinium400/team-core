const http = require ('http');
const config = require('./config');
const routs = require('./router');
const server = config(http.createServer(routs));
server.start();
console.log('we created a server');

