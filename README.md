#dockerNodeHello

Simple node application that builds & manages several docker hello world containers.  
The tool makes use both docker core and the docker remote API.   

NOTE 1: Docker version used for this example is 1.11.2 and docker API version is 1.23  
NOTE 2: This application is configured to run locally.  


##Prerequisites

1. Install node  
    https://nodejs.org/en/  

2. Install docker  
    https://docs.docker.com/engine/installation/linux/ubuntulinux/  

3. Install git (Ubuntu)  
    $sudo apt-get update  
    $sudo apt-get install git  
  
4. (opt) Add your local user to the docker group (to avoid sudo-ing)  

5. Enable docker remote API  
    a. edit /etc/init/docker.conf  
    b. update the DOCKER_OPTS variable to the following:  
       DOCKER_OPTS='-H tcp://0.0.0.0:4243 -H unix:///var/run/docker.sock'  
  
       The last command means that the host machine will listen to port 4243 for incoming docker command requests  
      
    c. sudo service docker restart  

6. Install curl    
   $sudo apt-get install curl  
     
7. Test docker API.  
    $curl http://localhost:4243/images/json will respond a json containing the docker images info  

    
## 1. Clone repository

$git clone https://github.com/dcharlaftis/dockerNodeHello.git  
$cd dockerNodeHello  


## 2. Build image

The following command builds the docker hello world image.  

$node dockerNodeHello.js -b  
or  
$node dockerNodeHello.js --build    


## 3. Get images list (from remote API)

The following command makes use of the remote API to see all the image details in json format.  

$node dockerNodeHello.js -i  
or  
$node dockerNodeHello.js --images   


## 4a. Run containers

The following command runs multiple containers from the image built before.  

$node dockerNodeHello.js -r cont1:2001 cont2:2002 .... etc  
or  
$node dockerNodeHello.js --run cont1:2001 cont2:2002 .... etc  

Runs container with name cont1 on external port 2001 and container with name cont2 on external port 2002.  

The mapped log pool file (for all the containers) is logPool/output.log  


## 4b. Run containers (using the remote API)

### i) create container

The following command uses the remote API to post container info in json format.  
$node dockerNodeHello.js --create containerName:port  

After a successfull creation, API responds with the conteiner ID.   

### ii) start container

Using the ID from the previous step, start the container.  
$node dockerNodeHello.js --start containerID

### ii) stop container

Using the ID from the previous step, stop the container.  
$node dockerNodeHello.js --stop containerID


## 5a. Display containers status

Show a list of all  running containers.  

$node dockerNodeHello.js -s  
or  
$node dockerNodeHello.js --status  


## 5b. Display containers list (from remote API)

The following command makes use of the remote API to see all the container details in json format.  

$node dockerNodeHello.js -co  
or  
$node dockerNodeHello.js --containers   


## 6a. Clear containers

Clears a list of available containers.  

$node dockerNodeHello.js -c containerName1  containerName2   
or  
$node dockerNodeHello.js --clear containerName1  containerName2  

NOTE: To clear all the containers run:   
$node dockerNodeHello.js --clear all  


## 6b. Clear containers (using remote API)

Clears a list of available containers.  

$node dockerNodeHello.js -rm containerName1  containerName2   
or  
$node dockerNodeHello.js --remove containerName1  containerName2  

NOTE: To clear all the containers run:   
$node dockerNodeHello.js --remove all  


## 7a. Display containers performance

Show the resource consumtion of each container (%CPU, memory, etc).  

$node dockerNodeHello.js -p  
or  
$node dockerNodeHello.js --performance  


## 7b. Display a specific container's performance (from remote API)

Show a container's resource usage statistics using remote API (%CPU, memory, etc).  

$node dockerNodeHello.js -st containerName
or  
$node dockerNodeHello.js --statistics  containerName


## 8. Inspect a specific container by its id (from remote API)

Use a containers id (or its name) as a parameter and inspect all its info in detail.  

$node dockerNodeHello.js -in containerID  
or  
$node dockerNodeHello.js --inspect containerID  


## 9. Test containers

On a browser hit http://localhost:2001 and http://localhost:2002.  
You will see the response logs from both the dockerized node servers in logPool/output.log file.    


## 10. Get help

Print help text from command line.  

$node dockerNodeHello.js -h or  
$node dockerNodeHello.js --help  


