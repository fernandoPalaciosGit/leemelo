/**
 * MANAGER WORKER
 * create a slaveWorker or reInitialize slaveWorker (if dies or crashed the app)
 */
;(function () {
    'use strict';

    var MasterWorker = function (cluster) {
        this.cluster = cluster;
    };

    MasterWorker.prototype.createSlaveWorker = function () {
        var worker = this.cluster.fork();
        console.warn('Worker %s start.', worker.id);
    };

    MasterWorker.prototype.onWorkerExit = function (worker) {
        console.warn('Worker %s died.', worker.id);
        setTimeout(this.createSlaveWorker.bind(this), 500);
    };

    module.exports = MasterWorker;
}());
