'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path'),
    connect_timeout = require('connect-timeout');
    
module.exports = function (expressApp, envConfig, routes, errorMiddleware) {

    var routingRoot = envConfig.express_routing_override || 
        envConfig.public.app_root_url;

    // Middleware stack for all requests
    expressApp.use(routingRoot, express.static(path.resolve(__dirname + '/../public'))); // static files in /public
    expressApp.use(connect_timeout(envConfig.timeout.time));                             // request timeouts
    expressApp.use(bodyParser.urlencoded({extended: false}));                            // parse application/x-www-form-urlencoded
    expressApp.use(bodyParser.json());                                                   // parse application/json
    expressApp.use(methodOverride('_method'));                                           // post -> put and delete where not allowed in client
    expressApp.use(routingRoot, routes.router);                                          // app router

    expressApp.use(function(req, res, next){                                             // barebones 404 handler
        return res.status(404).send('Not Found.').end();
    });
    expressApp.use(errorMiddleware.catchAllErrorHandler);                                // Handle errors from middleware/routes

};