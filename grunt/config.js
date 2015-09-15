module.exports = function (grunt) {
    'use strict';

    var conf = require('./../server/conf'),
        _ = require('lodash'),
        lintPaths = [
            'Gruntfile.js',
            'app.js',
            'middlewares/**/*.js',
            'server/**/*.js',
            'workers/**/*.js',
            'test/**/*.js',
            'website/**/*.js',
            'grunt/**/*.js'
        ];

    conf.server = conf['serverDev'];
    return {
        githooks: {
            options: {
                template: 'grunt/template-git-hooks.hb',
                hashbang: '#!' + conf.nodeRootPath + '/node'
            },
            all: {
                'pre-commit': 'grunt lint'
            }
        },
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
    };
};
