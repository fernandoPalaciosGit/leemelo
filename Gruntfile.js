(function () {
    'use strict';
    
    var conf = require('./server/conf');

    conf.server = conf['serverDev'];
    module.exports = function (grunt) {
        // loading apckages
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-shell-spawn');
        // configuration packages
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
                    'test/**/*.js',
                    'website/**/*.js'
                ]
            },
            shell: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    execOptions: {
                        maxBuffer: Infinity
                    }
                },
                runDB: {
                    command: [
                        'C:', 'mongod'
                    ].join('&&'),
                    options: {
                        async: true
                    }
                },
                runProject: {
                    command: 'npm start'
                },
                openProject: {
                    command: 'start chrome \"' + conf.getserverPath() + '/landing' + '\"'
                }
            }
        });
        // Console instructions
        grunt.registerTask('lint', ['jshint']);
        grunt.registerTask('run', ['shell:runDB', 'shell:openProject', 'shell:runProject']);
    };
}());