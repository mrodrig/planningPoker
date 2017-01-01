'use strict';
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.config('less', {
        dist: {
            options: {
                paths: ['app/public/less']
            },
            files: {
                'app/public/css/layout.css': 'app/public/less/planning.less'
            }
        }
    });
};
