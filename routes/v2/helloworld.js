// Common namespace
var Common = require('./../../common');
var conf = Common.conf;
var info = Common.info;
var helper = require('./../../helpers/helloworld.helper');

var hello = function (req, res) {
  // Validate params
  if (!('name' in req.query)) {
    return helper.missingParams(req, res); // fires off a 400
  }
  var name = req.query.name;

  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  var out = {
    hello: 'hello, ' + name + '!'
  };
  res.end(JSON.stringify(out));
}

exports.hello = hello;