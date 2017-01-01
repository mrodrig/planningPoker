'use strict';

var express = require('express');

/*jshint -W072 */
module.exports = function (statusCodes, homeController) {
/*jshint +W072 */

    var router = express.Router();

    /**
     * Sends 405 for routes that are not allowed in this model
     */
    var methodNotAllowed = function (req, res, next) {
        var error = new Error('Non supported method.');
        error.status = statusCodes.METHOD_NOT_ALLOWED;
        next(error);
    };

    /** FRONT-END Route **/

    router.route('/')
        .all(homeController.index)
        .all(methodNotAllowed);

    return router;
};
