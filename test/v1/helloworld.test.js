var request = require('request');
var mocha = require('mocha');
var should = require('should');
var Common = require('./../../common');
var conf = Common.conf;
var baseUrl = 'http://localhost:' + conf.port;

describe('v1/', function () {

  describe('v1/hello', function () {
    it('should return 200, {hello: 1}', function (done) {
      var url = baseUrl + '/v1/hello';
      request.get(url, function (err, res, body) {
        res.statusCode.should.equal(200);
        var msg = JSON.parse(res.body);
        msg.hello.should.equal(1);
        done();
      });
    });
  });

  describe('v1/goodbye', function () {
    it('should return 200, {goodbye: 1}', function (done) {
      var url = baseUrl + '/v1/goodbye';
      request.get(url, function (err, res, body) {
        res.statusCode.should.equal(200);
        var msg = JSON.parse(res.body);
        msg.goodbye.should.equal(1);
        done();
      });
    });
  });

});