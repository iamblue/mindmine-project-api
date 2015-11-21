var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
global.Sequelize = require('sequelize');
var config = require('./config');
var parser = require('body-parser-json');
var postgres = {
  username: config.username,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database
};
var connectMultiparty = require('connect-multiparty');

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
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(connectMultiparty());

app.use(cookieParser());
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type,apiKey,Authorization,deviceKey');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/sockets', function (req, res) {
  res.sendfile(__dirname + '/public/socket.io.html');
});

app.use('/', routesFrameController);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
var _server = require('http').Server(app);
var io = require('socket.io')(_server);

var server = _server.listen(3999, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
    console.log(data);
  });
});

module.exports = app;
