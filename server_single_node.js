/**
 * Created by ARUN on 14/11/2015.
 */
var express = require('express');

var app = express();


app.get('/', function(req,res){
    res.send('Request handled by process ' + process.pid );
});

app.listen(8001,function(){

    console.log('server listening in port 80001');
});