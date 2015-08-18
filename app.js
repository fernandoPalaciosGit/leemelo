;(function () {
    'use strict';
    
    var cluster = require('cluster'),
        APP = {
            env : process.env.NODE_ENV,
            worker: null,
            masterWorker: null,
            finishProcess: function (options) {
                options.event !== 'exit' && console.error('Exit app process by %s event', options.event);
                process.env['NODE_ENV'] = 'development';
                process.exit();
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
                cluster.on('exit', function (worker){
                    this.masterWorker.onWorkerExit(worker);
                }.bind(this));    
            },
            /**
             * Manage Slaves Cluster : Execute program in all clusters
             * For each this Worker we create and run our aplication 
             * We cannot debug into this kind aplications process (there are many http --debug ports)
             */
            initServer: function () {
                var SlaveWorker = require('./workers/slave.worker');
                
                this.worker = new SlaveWorker();
                this.worker.initalizeConnection();
            },
            /**
             * Manage Slave Worker for debug
             * We are not interesting in initalize the routing server, only export server.
             */
            exportTestingServer : function () {
                this.initServer();
                module.exports = this.worker.app.expressServer;  
            }
        };
    
    // retun NODE_ENV default settings
    process.on('exit', APP.finishProcess.bind(APP, {event: 'exit'}));
    process.on('SIGINT', APP.finishProcess.bind(APP, {event: 'SIGINT'}));
    process.on('uncaughtException', APP.finishProcess.bind(APP, {event: 'SIGINT'}));
    
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