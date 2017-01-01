'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.config('clean',  {
        logs: {
            src: [ 'logs/*.log' ]
        },
        stylesheets: {
            src: [ 'app/public/css/*.css' ]
        },
        markoViews: {
            src: [ 'app/views/*.js' ]
        }
    });
};
