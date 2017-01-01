'use strict';

var marko = require('marko'),
    path = require('path');
    
module.exports = function (expressApp) {

    // Setup the 'marko' engine which just loads the template file and calls render on it
    expressApp.engine('marko', function(filePath, options, callback) {
        marko.load(filePath).render(options, function(err, output) {
            callback(err, output);
        });
    });

    //set up view path and engine
    expressApp.set('views', path.join(__dirname , '../views'));
    expressApp.set('view engine', 'marko');

};
