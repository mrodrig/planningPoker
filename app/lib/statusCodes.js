'use strict';

/**
 * This module contains HTTP status codes to be used throughout the entire application.
 * @returns {{VERSION_UPDATE_STATUS: number, BAD_REQUEST_STATUS: number, NOT_FOUND_STATUS: number}}
 */
module.exports = {
    BAD_REQUEST_STATUS: 400,
    NOT_FOUND_STATUS: 404,
    METHOD_NOT_ALLOWED: 405,
    VERSION_CONFLICT_STATUS: 409,
    HIGHEST_400_RANGE_STATUS: 499
};