const createError = require('http-errors');
const express = require('express');
const app = express();

const animalsRouter = require('./routes/animals');
app.use('/', animalsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // display error
  res.status(error.status || 500);
  res.send(res.locals);
});

module.exports = app;
