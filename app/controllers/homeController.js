'use strict';

var pjson = require('../../package.json'),
    _ = require('underscore');

module.exports = function (envConfig, statusCodes) {
    return {
        // Landing page
        index: function (req, res, next) {
            return res.render('index', {
                homeConfig: {
                    version: pjson.version,
    
                    userId: JSON.stringify(req.user),
    
                    appRootUrl: envConfig.express_routing_override ? envConfig.express_routing_override : envConfig.public.app_root_url,
    
                    appDomain: (req.headers['x-forwarded-proto'] ? req.headers['x-forwarded-proto'] + '://' : 'http://') + req.headers.host,
    
                    envConfig: JSON.stringify(_.extend(envConfig, {
                        statusCodes: statusCodes
                    }))
                }
            });
        }
    };
};