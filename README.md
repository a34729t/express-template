express-template
================

Here's my express app template with config, logging, db and routes separated into modules. It is fully functional, so you can start it and make requests with your browser and run the test suite against it. I've included a mysql connection for example purposes but it is not used.

Note that this app is is an api that returns json in response to requests- it does not use jade or any sort of html library.

# What you get?

* Can run for different environments (production,development,testing) using options specified in configuration file
* Test using mocha
* Logging using winston
* MySQL using node-mysql; handles reconnects and disconnects
* Versioning of routes
* /info route that on startup gives us app information (git, uptime, etc.)
* Common functions gathered into an extra module; could be extended into a directory/namespace

# Running

To run, specify the node environment you want to use:

    NODE_ENV=production node app.js

The routes that come with the template can be accessed with the following urls:

    http://localhost:8080/v1/info
    http://localhost:8080/v1/hello
    http://localhost:8080/v1/goodbye
    http://localhost:8080/v2/hello
    http://localhost:8080/v2/hello?name=foo

# Testing

Instead of doing unit tests I go straight ahead and write functional tests for all routes. This requires the main app to be running first.

    mocha

# Configuration

The config.js file contains configuration for different environments. One case is choosing which database you use in production vs testing. You can add new environments and parameters easily. Here is how the production environment looks for this project:

    case 'production':
      return {
        logPath: './logs/app.log',
        timeout: 3000,
        db: {
          hostname: 'mydbname',
          user: 'user',
          pass: 'pass',
          schema: 'schema'
        }
      };

And to access the these parameters in another module, you just use conf.*

    var connection = mysql.createConnection({
      host: conf.db.hostname, <--------------------------------
      ...
    });

# Logging

I use the winston library for logging. It's really easy to use and very flexible. It doesn't allow you to rotate logs except based on size (so no logfile for each day unless you use a cron job) but it's nice apart from that.

The default configuration (in config.js) logs all information levels to

        ./logs/app.log

To log express requests with winston, we have to do a little extra work, as explained in this Stackoverflow post: http://stackoverflow.com/questions/9141358/how-do-i-output-connect-expresss-logger-output-to-winston

# Middleware

Sample middleware writes request ids to request query parameters. These are not used for anything currently. This middleware is applied; route specific middleware can be also be used.

# MySQL

In common.js, if you want to use MySQL, uncomment out the first connection line and remove the second, and make sure your db configuration in config.js is correct.

    // MySQL
    //var connection = require('./database.js')(conf);
    var connection = null;

# API Structure

This app supports multiple API versions from the start. For more info on designing APIs, I recommend looking at Web API Design by Brian Mulloy.

# Folder Structure

    app.js             # entry point, defines express http server and basic routing
    common.js          # common namespace, allows modules to access logger, config, db conn and so on
    config.js          # config file, contains config info for production and development environments
    database.js        # database connection logic (uses node-mysql)
    middleware.js      # middleware for express http server
    package.json       # npm package info
    README.md          # this file

    helpers/           # helper functions for all routes
      helloworld.helper.js

    logs/              # this is where logs get generated

    routes/
      v1/          
        info.js        # general purpose and info routes
        helloworld.js  # helloworld routes
      v2/
        helloworld.js  # helloworld routes

    test/
      mocha.opts       # testing config file
      v1/              # functional tests for v1 api
        info.test.js
        helloworld.test.js
      v2/              # functional tests for v2 api
        helloworld.test.js

# Future Work
* Make express to winston logging prettier/better integrated with winston format
* Make a custom middleware for express logging that includes request ids
* Add in push notification service (apn module) with my helper functions
* Passport authentication; I use my own homebrewed solution but for this template OAuth is more helpful
* Sample route-specific middleware (for authentication, probably)