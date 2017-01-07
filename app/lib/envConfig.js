'use strict';

module.exports = {
    port: 8080,
    logging: {
        level: 'info',
        filename: 'logs/planning.log'
    },
    timeout: {
        time: 7000
    },
    public: {
        app_root_url : '/planning'
    },
    name: 'local'
};