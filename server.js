const http = require('http');
const debug = require('debug');
const express = require('express');
const app = express();

// the global 'process' provides information about, and control over, the current nodejs process
// the env property returns an object containing the user environment
const port = normalizePort(process.env.PORT || 3001);
app.set('port', port);

// create HTTP server
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// returns a valid port whether it is provided as a number or a string
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

function onError(error) {
  // syscall is the fundamental interface between an application and the kernel
  if (error.syscall !== 'listen') {
    throw error;
  }

  const adress = server.address();
  const bind = typeof port === 'string' ? 'pipe ' + adress : 'port: ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    // permission denied
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    // address already in use
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

function onListening() {
  // server.address() get the bound address of the server containing the family name and the port
  const adress = server.address();
  const bind = typeof adress === 'string' ? 'pipe ' + adress : 'port: ' + port;
  debug('Listening on ' + bind);
}

// test server connection
app.use('/', function(req, res, next) {
  res.send({ status: 'connected!' });
})
