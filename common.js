// Common data file (more or less namespace for node.js)
// Config file, so we make config available to other modules via this module
var Config = require('./config');
var conf = new Config();

// MySQL
//var connection = require('./database.js')(conf);
var connection = null;

// Logger
var winston = require('winston');
var logger = new(winston.Logger)({
  transports: [
  new(winston.transports.Console)({
    timestamp: true,
    handleExceptions: true
  }),
  new(winston.transports.File)({
    filename: conf.logPath,
    timestamp: true,
    handleExceptions: true,
    json: false,
    maxsize: 100000000
  })],
  exitOnError: false
});

// Stream to pass to express logger to log http requests
// See http://stackoverflow.com/questions/9141358/how-do-i-output-connect-expresss-logger-output-to-winston
var loggerStream = {
  write: function (message, encoding) {
    logger.info(message.substring(0,message.length-1));
  }
};

var appStartTime = Date.now();

var info = {
  NODE_ENV: process.env.NODE_ENV,
  startTime: (new Date()).toJSON(),
  uptime: 0,
  git: {}
};

// Git info
var gitinfo = require('gitinfo');
gitinfo.all(function (gitStuff) {
  info.git = gitStuff;
});

exports.appStartTime = appStartTime;
exports.connection = connection;
exports.conf = conf;
exports.logger = logger;
exports.loggerStream = loggerStream;
exports.info = info;