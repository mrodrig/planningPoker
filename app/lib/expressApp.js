'use strict';
//Express-train will export this as our app
//allows override of app
var express = require('express');

module.exports = function(){
    var app = express();
    return app;
};
