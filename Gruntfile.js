module.exports = function (grunt) {
    'use strict';

    var gruntConfig = require('./grunt/config')(grunt),
        timeGrunt = require('time-grunt');

    // loading apckages
    timeGrunt(grunt);
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-githooks');

    // configuration packages
    grunt.initConfig(gruntConfig);

    // Console instructions
    grunt.registerTask('lint', 'For git-hooks proyect validation.',
            ['jshint', 'jscs']);
    grunt.registerTask('server', 'For proyect deployment.',
            ['githooks', 'shell:runMongo', 'shell:openProject', 'shell:runServer']);
};
