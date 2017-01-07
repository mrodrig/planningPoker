'use strict';

var express = require('express'),
    consoleStamp = require('console-stamp'),
    path = require('path'),
    bodyParser = require('body-parser'),
    http = require('http'),
    marko = require('marko'),
    socketIo = require('socket.io'),
    connect_timeout = require('connect-timeout'),
    methodOverride = require('method-override');
    
var envConfig = require('./lib/envConfig'),
    logging = require('./lib/logging'),
    baseRouter = require('./routes/baseRouter'),
    socketHandler = require('./lib/socketHandler');
    

/* this will add timestamps to all console logs in case
 * they escape out. Though, we should be striving to use
 * our configured logger for everything.
 */
consoleStamp(console, 'yyyy-mm-dd HH:MM:ss.l');

var app = express();

var routingRoot = envConfig.express_routing_override || envConfig.public.app_root_url || '';

// Ensure files in app/public can be accessed via URL
app.use(routingRoot, express.static(path.join(__dirname + '/public/')));

// Configure timeouts on requests
app.use(connect_timeout(envConfig.timeout.time));

// Allows us to use query params on requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride('_method'));

app.use(routingRoot, baseRouter);

// Setup the 'marko' engine which just loads the template file and calls render on it
app.engine('marko', function(filePath, options, callback) {
    marko.load(filePath).renderToString(options, function(err, output) {
        callback(err, output);
    });
});

//set up view path and engine
app.set('views', path.join(__dirname , 'views'));
app.set('view engine', 'marko');

var server = http.createServer(app),
    io = socketIo.listen(server);
    
server.listen(envConfig.port, function() {
    logging.info('Application Listening on Port: %s', envConfig.port);
});
socketHandler(io);