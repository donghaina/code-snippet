#! /bin/bash

cd ~/Desktop/Code/learn-python/testflask
process=$1
pid=$(docker ps | grep testflask | awk '{print $1}')
docker stop $pid
docker build -t 'testflask' .
docker run -it --rm -p 8888:8888 testflask

