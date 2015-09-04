(function () {
    'use strict';

    var conf = require('./server/conf'),
        lintPaths = [
            'Gruntfile.js',
            'app.js',
            'middlewares/**/*.js',
            'server/**/*.js',
            'workers/**/*.js',
            'test/**/*.js',
            'website/**/*.js'
        ];

    conf.server = conf['serverDev'];
    module.exports = function (grunt) {
        // loading apckages
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-shell-spawn');
        grunt.loadNpmTasks('grunt-jscs');
        // configuration packages
        grunt.initConfig({
            jscs: {
                files: {
                    src: lintPaths
                },
                options: {
                    fix: true,
                    config: '.jscsrc',
                    verbose: true
                }
            },
            jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },
                all: lintPaths
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
        grunt.registerTask('lint', ['jshint', 'jscs']);
        grunt.registerTask('run', ['shell:runDB', 'shell:openProject', 'shell:runProject']);
    };
}());
