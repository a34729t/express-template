var request = require('request');
var mocha = require('mocha');
var should = require('should');
var Common = require('./../../common');
var conf = Common.conf;
var baseUrl = 'http://localhost:'+conf.port;

describe('v1/info', function () {
  
  describe('/info', function () {
    it('should return 200, {NODE_ENV: ..., started: ..., uptime: ..., git: ... }', function (done) {
      var url = baseUrl+'/v1/info';
      request.get(url, function (err, res, body) {
        res.statusCode.should.equal(200);
        var msg = JSON.parse(res.body);
        should.exist(msg.NODE_ENV);
        should.exist(msg.startTime);
        should.exist(msg.uptime);
        should.exist(msg.git);
        done();
      });
    });
  });
  
});