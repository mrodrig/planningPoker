'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.config('jshint', {
        all: [
            'app/**/*.js',
            'test/**/*.js',
            '!app/views/**/*.marko.js',
            '!Gruntfile.js',
            '!grunt/**/*.js'
        ],
        options: {
            // the hinter will use .jshintrc files "closest" to
            // the directories specified.  we have multiple.
            // this also allows us to share configs with IntelliJ
            jshintrc: true
        }
    });
};