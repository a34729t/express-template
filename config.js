module.exports = function () {
  switch (process.env.NODE_ENV) {
  case 'production':
    return {
      port: 8080,
      logPath: './logs/app.log',
      timeout: 3000,
      db: {
        hostname: 'mydbname',
        user: 'user',
        pass: 'pass',
        schema: 'schema'
      }
    };

    case 'testing':
      return {
      port: 8080,
        logPath: './logs/app.log',
        timeout: 3000,
        db: {
          hostname: 'testdb',
          user: 'user',
          pass: 'pass',
          schema: 'schema'
        }
      };

  default:
    return {
      port: 8080,
      logPath: './logs/app.log',
      timeout: 3000,
      db: {
        hostname: 'localhost',
        user: 'user',
        pass: 'pass',
        schema: 'schema'
      }
    };

  }
};