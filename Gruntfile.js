(function () {
    'use strict';
    
    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.initConfig({
            jshint: {
                options: {
                    jshintrc: '.jshintrc' 
                },
                all: [
                    'Gruntfile.js',
                    'app.js',
                    'middlewares/**/*.js',
                    'server/**/*.js',
                    'workers/**/*.js',
                    'tests/**/*.js',
                    'website/**/*.js'
                ]
            }
        });
        grunt.registerTask('lint', ['jshint']);
    };
}());