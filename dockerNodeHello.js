
/*
  The main tool for manipulating docker containers. 
  Each container is a web server responding "Hello world!"

  For help type:
  $node dockerNodeHello.js -h (or --help)
*/

var sys = require('sys');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout) }

//check for build option
//usage: $node dockerNodeHello.js -b
if ((process.argv[2] === '-b') || (process.argv[2] === '--build')) {
    var command = "docker build -t mizo/node-web-app .";
    console.log("Executing command:", command);
    exec(command, puts);

}

//get the available docker images using the docker remote API
//usage: $node dockerNodeHello.js -i or  $node dockerNodeHello.js --images
if ((process.argv[2] === '-i') || (process.argv[2] === '--images')) {
    var command = "curl -X GET http://localhost:4243/images/json";
    console.log("Executing command:", command);
    exec(command, puts);

}

//get the available docker containers using the docker remote API
//usage: $node dockerNodeHello.js -co or  $node dockerNodeHello.js --containers
if ((process.argv[2] === '-co') || (process.argv[2] === '--containers')) {
    var command = "curl -X GET http://localhost:4243/containers/json";
    console.log("Executing command:", command);
    exec(command, puts);

}

//run containers - check container names and ports
//usage: $node dockerNodeHello.js -r container1:port1 container2:port2 ... etc 
else if ((process.argv[2] === '-r') || (process.argv[2] === '--run')) {
    if (process.argv[3] == null) {
        console.log("Please specify valid container name and ports.");
        console.log("USAGE: $node dockerNodeHello.js -r <container1>:<port1> <container2>:<port2> ... etc");
        process.exit(3);
    }
    //find the home directory
    var homeArr = process.argv[1].split("/dockerNodeHello.js");
    var homeFolder = homeArr[0];
   
    for (var i = 3; i < process.argv.length; i++) {
        var argmnt = process.argv[i].split(":");
        var container_name = argmnt[0];
        var container_port = argmnt[1];
        var command = "docker run --name " + container_name + " -v "+homeFolder+"/logPool:/var/log/server_log" + " -p " + container_port + ":8080 -d mizo/node-web-app";
        console.log("Executing command:", command);
        exec(command, puts);
    }
}

//create a container using the remote API
//usage: $node dockerNodeHello.js --create containerName:port  
else if  (process.argv[2] === '--create') {
    if (process.argv[3] == null) {
        console.log("Please specify valid container name and port.");
        console.log("USAGE: $node dockerNodeHello.js --create <containerName>:<port> ");
        process.exit(3);
    }

    var argmnt = process.argv[3].split(":");
    var container_name = argmnt[0];
    var container_port = argmnt[1];
    var command = "curl -X POST -H 'Content-Type: application/json' http://localhost:4243/containers/create -d   '";
    command += '{ "Hostname":"'+ container_name+'",\
        "Domainname": "",\
        "User": "",\
        "AttachStdin": false,\
        "AttachStdout": true,\
        "AttachStderr": true,\
        "Tty": false,\
        "OpenStdin": false,\
        "StdinOnce": false,\
        "Image": "mizo/node-web-app",\
        "Volumes": {\
            "/volumes/data": {}\
        },\
        "ExposedPorts": {\
            "8080/tcp": {}\
        },\
        "StopSignal": "SIGTERM",\
        "HostConfig": {\
            "Binds": ["/logPool:/var/log/server_log"],\
            "PortBindings": {\
                "8080/tcp": [{\
                    "HostPort":"'+ container_port+'"\
                }]\
            }\
        }\
    }';
    command+="'";

    console.log("Executing command:", command);
    exec(command, puts);

}

//start a container using the remote API
//usage: $node dockerNodeHello.js --start containerID (you can see the id from the container's creation step)  
else if  (process.argv[2] === '--start') {
    if (process.argv[3] == null) {
        console.log("Please specify valid container id.");
        console.log("USAGE: $node dockerNodeHello.js --start <containerID>");
        process.exit(3);
    }
    
    var container_id = process.argv[3];
    var command = "curl -X POST http://localhost:4243/containers/" + container_id + "/start";
    console.log("Executing command:", command);
    exec(command, puts);

}

//stop a container using the remote API
//usage: $node dockerNodeHello.js --stop containerID (you can see the id from the container's creation step)  
else if  (process.argv[2] === '--stop') {
    if (process.argv[3] == null) {
        console.log("Please specify valid container id.");
        console.log("USAGE: $node dockerNodeHello.js --stop <containerID>");
        process.exit(3);
    }
    
    var container_id = process.argv[3];
    var command = "curl -X POST http://localhost:4243/containers/" + container_id + "/stop";
    console.log("Executing command:", command);
    exec(command, puts);

}

//clear containers 
//usage: $node dockerNodeHello.js -c container1 container2 ... etc 
else if ((process.argv[2] === '-c') || (process.argv[2] === '--clear')) {
    if (process.argv[3] == null) {
        console.log("Please specify valid container name(s).");
        console.log("USAGE: $node dockerNodeHello.js -c <container1> <container2> ... etc");
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

//kill and remove containers using remote API
else if ((process.argv[2] === '-rm') || (process.argv[2] === '--remove')) {
    if (process.argv[3] == null) {
        console.log("Please specify valid container name(s).");
        console.log("USAGE: $node dockerNodeHello.js -rm <container1> <container2> ... etc");
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
            var command = "curl -X POST http://localhost:4243/containers/" + container_name + "/kill ";
            command+=" && curl -X DELETE http://localhost:4243/containers/" + container_name;
            console.log("Executing command:", command);
            exec(command, puts);
        }
    }

}

//display containers  resource usage statistics using remote API
//usage: $node dockerNodeHello.js -st containerName
else if ((process.argv[2] === '-st') || (process.argv[2] === '--statistics')) {
    if (process.argv[3] == null) {
        console.log("Please specify valid container name.");
        console.log("USAGE: $node dockerNodeHello.js -st containerName");
        process.exit(3);
    }
    var container = process.argv[3];
    var command = " curl -X GET http://localhost:4243/containers/"+container+"/stats?stream=0";
    exec(command, puts);
}

//inspect a specific container by its id. 
//You can find the containr's running $node dockerNodeHello.js -s 
//usage: $node dockerNodeHello.js -in containerID or $node dockerNodeHello.js --inspect containerID 
else if ((process.argv[2] === '-in') || (process.argv[2] === '--inspect')) {
     if (process.argv[3] == null){
        console.log("Please specify valid container id for inspection.");
        console.log("USAGE: $node dockerNodeHello.js -in <containerID> or $node dockerNodeHello.js --inspect <containerID>");
        process.exit(3);
     }

    var container_id = process.argv[3];
    var command = "curl -X GET http://localhost:4243/containers/" + container_id +"/json";
    console.log("Executing command:", command);
    exec(command, puts);
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
    var command = "docker stats --no-stream";
    console.log("Executing command:", command);
    exec(command, puts);
}

//get help
else if ((process.argv[2] === '-h') || (process.argv[2] === '--help')) {		    
    var helpText = "\n dockerNodeHello: Simple node application that builds and manages several docker hello world containers. \n \n USAGE: \n \n $node dockerNodeHello.js <mode> <parameters> \n \n mode options: \n \n";
    helpText += "\t\t -h  or --help: \t show help text \n";
    helpText += "\t\t -b  or --build:\t builds the docker image \n";
    helpText += "\t\t -i  or --images:\t display available docker images (using remote API) \n";
    helpText += "\t\t -co or --containers:\t display available docker containers (using remote API) \n\n";
    helpText += "\t\t -rm or --remove:\t removes a list of docker containers (using remote API) \n";
    helpText += "\t\t \t\t\t Example: $node dockerNodeHello.js --remove container1 container2 \n\n";
    helpText += "\t\t -in or --inspect:\t display a container's info by its id or its name (using remote API) \n";
    helpText += "\t\t \t\t\t Example: $node dockerNodeHello.js --inspect c455ac2e4fc3 \n\n";
    helpText += "\t\t -st or --statistics:\t display a container's resource consumption by its id or its name (using remote API) \n";
    helpText += "\t\t \t\t\t Example: $node dockerNodeHello.js --statistics containerName \n\n";
    helpText += "\t\t -r  or --run: \t\t runs a list of containers in specified ports defined in <parameters> \n";
    helpText += "\t\t \t\t\t Example: $node dockerNodeHello.js --run container1:port1 container2:port2 \n\n";
    helpText += "\t\t -c  or --clear\t\t clears a list of containers defined in <parameters>\n";
    helpText += "\t\t \t\t\t Example: $node dockerNodeHello.js --clear container1 container2 \n";
    helpText += "\t\t \t\t\t Example: $node dockerNodeHello.js --clear all (kills and deletes all containers) \n\n";
    helpText += "\t\t -s  or --status\t display containers status \n";
    helpText += "\t\t -p  or --performance\t display containers performance (resources consumtion) \n\n";  
    helpText += "\t\t --create\t\t creates a container (using remote API) \n";  
    helpText += "\t\t \t\t\t Example: $node dockerNodeHello.js --create containerName:port \n\n"; 
    helpText += "\t\t --start\t\t starts a container by its id (using remote API) \n";  
    helpText += "\t\t \t\t\t Example: $node dockerNodeHello.js --start containerID \n\n"; 
    helpText += "\t\t --stop\t\t\t stop a container by its id (using remote API) \n";  
    helpText += "\t\t \t\t\t Example: $node dockerNodeHello.js --stop containerID \n\n"; 

    console.log(helpText);
}
