'use strict';

var express = require('express');

var statusCodes = require('../lib/statusCodes'),
    homeController = require('../controllers/homeController'),
    errorMiddleware = require('../middleware/errorMiddleware');

var router = express.Router();

/**
 * Sends 405 for routes that are not allowed in this model
 */
var methodNotAllowed = function (req, res, next) {
    var error = new Error('Non supported method.');
    error.status = statusCodes.METHOD_NOT_ALLOWED;
    next(error);
};

/**
 * Sends 404 for routes that do not exist
 */
var notFound = function(req, res, next){
    return res.status(404).send('Not Found.').end();
};

/** FRONT-END Route **/

router.route('/')
    .all(homeController.index)
    .all(methodNotAllowed);
    
router.use(notFound);
router.use(errorMiddleware.catchAllErrorHandler);

module.exports = router;