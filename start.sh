#!/bin/bash

echo "Installing dependencies";
# Update apt-get
sudo apt-get -y update;

#install git
sudo apt-get install -y git;

# Install Node and npm nginx
sudo apt-get install -y nodejs;
sudo apt-get install -y npm;
sudo apt-get install -y build-essential;
sudo ln -s /usr/bin/nodejs /usr/bin/node;
sudo apt-get -y install nginx;

# set env to prod
sudo env NODE_ENV=production;

# install npm
echo "installing npm dependencies";
sudo npm install;

# build dist
echo "building dist";
sudo npm run build;
