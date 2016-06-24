var sys = require('sys')
var exec = require('child_process').exec;

// or more concisely
var sys = require('sys')
var exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout) }

//check for build option
//usage: $node dockerNodeHello.js -b
if ((process.argv[2] === '-b') || (process.argv[2] === '--build')) {
    var command = "docker build -t mizo/node-web-app .";
    console.log("Executing command:", command);
    exec(command, puts);

}
//check container names and ports
//usage: $node dockerNodeHello.js -r container1:port1 container2:port2 ... etc 
else if ((process.argv[2] === '-r') || (process.argv[2] === '--run')) {
    if (process.argv[3] == null) {
        console.log("Please specify valid container name and ports.");
        console.log("USAGE: $node dockerNodeHello.js -r container1:port1 container2:port2 ... etc");
        process.exit(3);
    }

    for (var i = 3; i < process.argv.length; i++) {
        var argmnt = process.argv[i].split(":");
        var container_name = argmnt[0];
        var container_port = argmnt[1];
        var command = "docker run --name " + container_name + " -v /home/mizo/Desktop/dockerNodeHello/logPool:/var/log/server_log" + " -p " + container_port + ":8080 -d mizo/node-web-app";
        console.log("Executing command:", command);
        exec(command, puts);
    }
}

//clear containers 
//usage: $node dockerNodeHello.js -c container1 container2 ... etc 
else if ((process.argv[2] === '-c') || (process.argv[2] === '--clear')) {
    if (process.argv[3] == null) {
        console.log("Please specify valid container name(s).");
        console.log("USAGE: $node dockerNodeHello.js -c container1 container2 ... etc");
        process.exit(3);
    } 
    //delete all containers
    else if (process.argv[3] == "all") {
    	var command = " docker kill $(docker ps -a -q) && docker rm $(docker ps -a -q)";
            console.log("Executing command:", command);
            exec(command, puts);

    } else {
        for (var i = 3; i < process.argv.length; i++) {
            var container_name = process.argv[i];
            var command = "docker kill " + container_name + "&& docker rm " + container_name;
            console.log("Executing command:", command);
            exec(command, puts);
        }
    }

}

//check containers status 
//usage: $node dockerNodeHello.js -s
else if ((process.argv[2] === '-s') || (process.argv[2] === '--status')) {
    var command = "docker ps";
    console.log("Executing command:", command);
    exec(command, puts);
}
//check containers performance 
//usage: $node dockerNodeHello.js -p
else if ((process.argv[2] === '-p') || (process.argv[2] === '--performance')) {
    var command = "docker stats";
    console.log("Executing command:", command);
    exec(command);
}