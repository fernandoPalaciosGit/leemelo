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
        require('time-grunt')(grunt);
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
                    async: false,
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    execOptions: {
                        maxBuffer: Infinity
                    }
                },
                runMongo: {
                    command: function (option) {
                        !option && grunt.warn('[OPTIONAL] > grunt server:path/db/mongo');
                        return 'mongod --dbpath ' + (option|| 'C:/data/db/');
                    },
                    options: {
                        async: true,
                        callback: function(exitCode, stdOutStr, stdErrStr, next) {
                            grunt.task.run(['shell:runServer', 'shell:openProject']);
                            next();
                        }
                    }
                },
                runServer: {
                    command: 'npm start'
                },
                openProject: {
                    command: 'start chrome \"' + conf.getserverPath() + '/landing' + '\"'
                }
            }
        });
        // Console instructions
        grunt.registerTask('lint', ['jshint', 'jscs']);
        grunt.registerTask('server', ['lint', 'shell:runMongo']);
    };
}());
