// Add random requestId to request, used for tracking requests across our system
var requestId = function (req, res, next) {
  require('crypto').randomBytes(10, function (ex, buf) { // generate token
    req.query.requestId = buf.toString('hex');
    next();
  });
}

exports.requestId = requestId;