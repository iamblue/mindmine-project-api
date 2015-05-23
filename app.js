var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

global.Sequelize = require('sequelize');
var config = require('./config');
var postgres = {
  username: config.username,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database
}
global.sequelize = new Sequelize('postgres://' + postgres.username + ':' + postgres.password + '@' + postgres.host + ':' + postgres.port + '/' + postgres.database);
var model = require('./models/index')();
var routesFrameController = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routesFrameController);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

var server = app.listen(3999, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

module.exports = app;
