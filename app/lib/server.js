'use strict';

module.exports = function(expressApp, logging, config, socket) {
    logging.info('Application Listening on Port: %s', config.port);


    return socket.server.listen(config.port);
};
