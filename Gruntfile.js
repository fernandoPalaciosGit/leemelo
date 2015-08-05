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
                    'middlewares/**/*.js',
                    'server/**/*.js',
                    'static/**/*.js',
                    'website/**/*.js'
                ]
            }
        });
        grunt.registerTask('lint', ['jshint']);
    };
}());