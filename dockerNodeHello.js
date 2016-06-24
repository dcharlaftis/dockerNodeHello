var sys = require('sys')
var exec = require('child_process').exec;
var child;

// or more concisely
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("pwd", puts);