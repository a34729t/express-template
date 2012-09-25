// Common namespace
var Common = require('./../../common');
var info = Common.info;

var serviceInfo = function (req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  info.uptime = (Date.now() - Common.appStartTime) / 1000; // uptime in seconds
  res.end(JSON.stringify(info));
}

exports.serviceInfo = serviceInfo;