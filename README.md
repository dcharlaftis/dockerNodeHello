#dockerNodeHello

Simple node application that builds & manages several docker hello world containers.


##Prerequisites

1. Install node  
    https://nodejs.org/en/  

2. Install docker  
    https://docs.docker.com/engine/installation/linux/ubuntulinux/  


##Clone repo

$git clone https://github.com/dcharlaftis/dockerNodeHello.git  
$cd dockerNodeHello  

##Build image

$node dockerNodeHello.js -b or $node dockerNodeHello.js --build  


## Run containers

$node dockerNodeHello.js -r cont1:2001 cont2:2002 .... etc or  
$node dockerNodeHello.js --run cont1:2001 cont2:2002 .... etc  

Runs container with name cont1 on external port 2001 and container with name cont2 on external port 2002.  

The mapped log pool file (for all the containers) is logPool/output.log  


##Clear containers

$node dockerNodeHello.js -c containerName1  containerName2  
or  
$node dockerNodeHello.js --clear containerName1  containerName2  

NOTE: To clear all the containers run:   
$node dockerNodeHello.js --clear all  

##Get containers status

$node dockerNodeHello.js -s  
or  
$node dockerNodeHello.js --status  

##Get containers performance

$node dockerNodeHello.js -p  
or  
$node dockerNodeHello.js --performance  

##Test containers

On a browser hit http://localhost:2001 and http://localhost:2002. You will see the responses from both the dockerized node servers in logPool/output.log file  

##Get help

$node dockerNodeHello.js -h or  
$node dockerNodeHello.js --help  


