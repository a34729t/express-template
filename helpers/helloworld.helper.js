// Helper functions, can be broken into multiple files once you have enough

var missingParams = function (req, res, old) {
  res.writeHead(400, {
    "Content-Type": "application/json"
  });
  var out = {};
  res.end(JSON.stringify(out));
  return;
}

exports.missingParams = missingParams;