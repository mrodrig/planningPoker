'use strict';

var train = require('express-train'),
    consoleStamp = require('console-stamp');

/* this will add timestamps to all console logs in case
 * they escape out. Though, we should be striving to use
 * our configured logger for everything.
 */
consoleStamp(console, 'yyyy-mm-dd HH:MM:ss.l');

/* pulling in our own custom config telling where express train can find it gives us some flexibility
 * to be able to pull a config file from a directory on a server but use one embedded within the project
 * for local development.
 */
var envConfig = require('./lib/envConfig');

var expressTrainConfigOpts = {
    base: __dirname,
    config: envConfig.express_train_config_file_location,
    files: [
        '**/*.js',
        {
            pattern: 'routes/*.js',
            aggregateOn: 'routes'
        },
        /* the stuff that bootstraps the app shouldn't
         * be injectable
         */
        '!*.js',
        '!public/**'
    ]
};

console.log('Setting up Express-Train configurations from location: ' + 
    envConfig.express_train_config_file_location ) ;
var tree = train(expressTrainConfigOpts);

module.exports = tree.resolve();