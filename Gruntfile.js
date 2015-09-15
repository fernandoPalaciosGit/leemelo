(function () {
    'use strict';

    var conf = require('./server/conf'),
        _ = require('lodash'),
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
        grunt.loadNpmTasks('grunt-shell-spawn');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-jscs');

        // configuration packages
        grunt.initConfig({
            jscs: {
                files: {
                    src: lintPaths
                },
                options: {
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
                    stdout: console.info,
                    stderr: console.error,
                    failOnError: true,
                    execOptions: {
                        maxBuffer: Infinity,
                        cwd: '.' // run commands in actual directory
                    }
                },
                runMongo: {
                    command: function (path, ip) {
                        var mongoPort = process.env.MONGO_PORT || ip || 27017,
                            mongoPath = path || 'C:/data/db/';

                        !_.isUndefined(path) && grunt.warn('[OPTIONAL] > grunt server:path/db/mongo:ip');
                        return 'mongod --port ' + mongoPort + ' --dbpath ' + mongoPath;
                    },
                    options: {
                        async: true
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
        grunt.registerTask('server', ['jshint', 'shell:runMongo', 'shell:openProject', 'shell:runServer']);
    };
}());
