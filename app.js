/**
 * Created by ARUN on 14/11/2015.
 */
var cluster = require('cluster');
var os = require('os');
var http = require('http');

/* This module is a example implementation of node cluster to serve more request through master-worker model. Workers are created 1 per
cpu of the host machine. Finally Apache benchmark (ab.exe, Download apache Haus from link below to get ab.exe ) is used to run benchmark to test incoming requests.
Run benchmark against process that handles request in just master and the one that handles in worker.
Apache Download Link : http://www.apachehaus.com/cgi-bin/download.plx?dli=ShkT6ZFMBFzTU10akZkSwpkVOpkVFVVca5mVZN1Z
 */

if(cluster.isMaster){

    var numCores = os.cpus().length;

    for(var i = 0; i < numCores; ++i) {
        cluster.fork();
    }
    cluster.on('online', function(worker){
        console.log('Worker' + worker.process.pid + 'is online');
    });

    cluster.on('exit', function(worker,code, signal){
        console.log('Worker' + worker.process.pid + 'died with code' + code + ', and signal : ' + signal);
        console.log('starting a new worker');
        cluster.fork();
    });
}else {
    var express = require('express');
    var app = express();
    app.get('*', function (req, res) {
        res.send('process' + process.pid + ' says Hello!').end();
    });
    var server = app.listen(8000, function () {
        console.log('Process' + process.pid + ' is listening to all incoming requests');
    });
}