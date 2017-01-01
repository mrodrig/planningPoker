'use strict';

module.exports = {
    express_train_config_file_location: '../config',
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