// This is a simple example of using the mysql-node module. We pass in the
// configuration file, establish a connection and set up the disconnect/
// reconnect handlers.
// See for more details: https://github.com/felixge/node-mysql

module.exports = function (conf) {
  var mysql = require('mysql');

  var connection = mysql.createConnection({
    host: conf.db.hostname,
    user: conf.db.user,
    password: conf.db.pass,
    database: conf.db.schema,
    insecureAuth: true
  });

  connection.connect(function (err) {
    // connected! (unless `err` is set)
    if (err) {
      logger.error('unable to connect: ' + err)
    }
  });

  function handleDisconnect(connection) {
    connection.on('error', function (err) {
      if (!err.fatal) {
        return;
      }
      if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
        throw err;
      }

      logger.warn('Re-connecting lost connection: ' + err.stack);
      connection = mysql.createConnection(connection.config);
      handleDisconnect(connection);
      connection.connect();
    });
  }
  handleDisconnect(connection);

  return connection;
};