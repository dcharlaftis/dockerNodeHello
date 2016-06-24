'use strict';
var sys = require('sys')
var exec = require('child_process').exec;

const express = require('express');

// Constants
const PORT = 8080;

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

// App
const app = express();
app.get('/', function(req, res) {
    res.send('Hello world\n');
    var msg = getDateTime() + ': Sending response ..';
    var command = "echo '" + msg + "' >>/var/log/server_log/output.log";
    console.log("Executing command:", command);
    exec(command);
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
