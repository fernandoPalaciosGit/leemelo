;(function () {
    'use strict';

    var cluster = require('cluster');
   
    /**
     * Manage Master Cluster, Open and realive slaves clusters
     */
    if (cluster.isMaster) {
        var MasterWorker = require('./workers/master.worker'),
            masterWorker = new MasterWorker(cluster),
            cpuCount = require('os').cpus().length;
             
        /**
         * Create a worker (with cluster) foreach cpu thread
         */
        for (var i = 0; i < cpuCount; i++) {
            masterWorker.createSlaveWorker();
        }
        
        /**
         * Once the worker died, reactivate new one, then we got full working cpus
         */
        cluster.on('exit', function (worker){
            masterWorker.onWorkerExit(worker);
        });
        
    /**
     * Manage Slaves Cluster : Execute program in all clusters
     * For each Worker we create and run into an instance of our aplication
     * We cannot debug into this kind aplications process (there are many http --debug ports)
     */
    } else {
        var SlaveWorker = require('./workers/slave.worker'),
            appWorker = new SlaveWorker();
        
        appWorker.initalizeConnection();
    }
}());