// Common namespace
var Common = require('./../../common');
var conf = Common.conf;
var info = Common.info;
var helper = require('./../../helpers/helloworld.helper');

var hello = function (req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  var out = {
    hello: 1
  };
  res.end(JSON.stringify(out));
}

var goodbye = function (req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  var out = {
    goodbye: 1
  };
  res.end(JSON.stringify(out));
}

exports.hello = hello;
exports.goodbye = goodbye;