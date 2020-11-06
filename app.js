const express = require('express');
const app = express();

// test server and router connection
app.use('/', function(req, res, next) {
  res.send({ status: 'connected!', router: 'app.js' });
});

module.exports = app;
