var request = require('request');
var mocha = require('mocha');
var should = require('should');
var Common = require('./../../common');
var conf = Common.conf;
var baseUrl = 'http://localhost:' + conf.port;

describe('v2/', function () {

  describe('v2/hello', function () {

    it('should return 400, {} when \'name\' arg is missing', function (done) {
      var url = baseUrl + '/v2/hello';
      request.get(url, function (err, res, body) {
        res.statusCode.should.equal(400);
        res.body.should.equal('{}');
        done();
      });
    });

    it('should return 200, {hello: \'hello, foo!\'}', function (done) {
      var name = 'foo';
      var url = baseUrl + '/v2/hello' + '?name=' + name;
      request.get(url, function (err, res, body) {
        res.statusCode.should.equal(200);
        var msg = JSON.parse(res.body);
        msg.hello.should.equal('hello, ' + name + '!');
        done();
      });
    });

  });

});