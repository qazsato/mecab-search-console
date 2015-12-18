'use strict';

// require node_modules
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const config       = require('config');
const compression  = require('compression');

// create app
const app = express();

// set app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// mount app
app.use(favicon(path.join(__dirname, 'public/dist/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public/dist'), {maxAge: 86400000 * 30}));

// define routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// error handlers
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
