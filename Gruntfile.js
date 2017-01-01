    'use strict';

module.exports = function (grunt) {

    //load all tasks
    grunt.loadTasks('grunt/tasks');

    // Register our own custom task alias
    grunt.registerTask('default', ['noTest']);
    grunt.registerTask('noTest', ['clean', 'less']);

};
