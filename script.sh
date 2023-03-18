#!/bin/bash

sudo apt-get remove docker docker-engine docker.io
sudo apt update -y
sudo apt install docker.io
sudo snap install docker
sudo apt install docker-compose

