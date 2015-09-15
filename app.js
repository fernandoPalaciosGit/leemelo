;(function () {
    'use strict';

    var _ = require('lodash'),
        mongoose = require('mongoose'),
        cluster = require('cluster'),
        conf = require('./server/conf'),
        APP = {
            env : process.env.NODE_ENV,
            worker: null,
            masterWorker: null,
            finishProcess: function (errOptions) {
                console.error(errOptions.event);
                process.env['NODE_ENV'] = '';
                if (mongoose.connection.readyState !== 0 && errOptions.event === 'SIGINT') {
                    mongoose.connection.close(process.exit);
                }
            },
            /**
             * Manage Master Cluster, Open and realive slaves clusters
             */
            setMasterCluester: function () {
                var MasterWorker = require('./workers/master.worker'),
                    cpuCount = require('os').cpus().length;

                this.masterWorker = new MasterWorker(cluster);
                /**
                 * Create a worker (with cluster) foreach cpu thread
                 */
                for (var i = 0; i < cpuCount; i++) {
                    this.masterWorker.createSlaveWorker();
                }

                /**
                 * Once the worker died, reactivate new one, then we got full working cpus
                 */
                cluster.on('exit', function (worker) {
                    this.masterWorker.onWorkerExit(worker);
                }.bind(this));
            },
            /**
             * Manage Slaves Cluster : Execute program in all clusters
             * For each this Worker we create and run our aplication
             * We cannot debug into this kind aplications process (there are many http --debug ports)
             */
            initServer: function () {
                var SlaveWorker = require('./workers/slave.worker'),
                    serverName = APP.env === 'production' ? 'serverProd' : 'serverDev',
                    confServer = _.clone(conf);

                confServer.server = confServer[serverName];
                this.worker = new SlaveWorker(confServer);
                this.worker.initalizeConnection();
            },
            /**
             * Manage Slave Worker for debug
             * We are not interesting in initalize the routing server, only export server.
             */
            exportTestingServer : function () {
                var SlaveWorker = require('./workers/slave.worker'),
                    confServer = _.clone(conf);

                confServer.server = confServer['serverTest'];
                this.worker = new SlaveWorker(confServer);
                this.worker.initalizeConnection();
                module.exports = this.worker.app.expressServer;
            }
        };

    // retun NODE_ENV default settings
    process.on('exit', _.bind(APP.finishProcess, APP, { event: 'exit' }));
    process.on('SIGINT', _.bind(APP.finishProcess, APP, { event: 'SIGINT' }));
    process.on('uncaughtException', _.bind(APP.finishProcess, APP, { event: 'uncaughtException' }));

    // $set "NODE_ENV=testing" && mocha app
    if (APP.env === 'testing') {
        APP.exportTestingServer.call(APP);

    // $set "NODE_ENV=production" && nodemon [--debug] app
    } else if (APP.env === 'production' && cluster.isMaster) {
        APP.setMasterCluester.call(APP);

    // $set "NODE_ENV=development" && nodemon [--debug] app
    } else {
        APP.initServer.call(APP);
    }
}());
