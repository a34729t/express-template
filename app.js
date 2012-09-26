// Libraries
var express = require('express');
var connect = require('connect');

// Common Namespace
var Common = require('./common');
var conf = Common.conf;
var logger = Common.logger;

// Middleware
var middleware = require('./middleware');
var requestId = middleware.requestId;

// Configure Express
var app = express.createServer();
app.configure(function () {
  // For logging, we pass the connect.logger as a stream to winson.  For more 
  // info on connect.logger options and parameters see: 
  //   http://extjs.github.com/Connect/logger.html
  app.use(
    connect.logger({ 
      stream: Common.loggerStream, 
      format: ':method :status :url :response-time'
    })
  );
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(requestId); // add requestId to ALL incoming requests
});

// Handle the favicon when app is called in browser
app.get('/favicon.ico', function (req, res) {});

// Define our API
// version 1.0
var info1 = require('./routes/v1/info');
app.get("/v1/info", info1.serviceInfo);
var helloworld1 = require('./routes/v1/helloworld');
app.get("/v1/hello", helloworld1.hello);
app.get("/v1/goodbye", helloworld1.goodbye);

// version 2.0
var helloworld2 = require('./routes/v2/helloworld');
app.get("/v2/hello", helloworld2.hello);

// Start the server
app.listen(conf.port);
logger.info('Starting Elphi API (mode=' + process.env.NODE_ENV + ')');