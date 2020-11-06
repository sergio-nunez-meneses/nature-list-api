const createError = require('http-errors');
const express = require('express');
const app = express();

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // render error view
  res.status(error.status || 500);
  res.send(res.locals);
});

module.exports = app;
