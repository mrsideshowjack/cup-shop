#!/bin/bash

echo "Installing dependencies";
# Update apt-get
sudo apt-get -y update;

#install git
sudo apt-get install -y git;

# Install Node and npm
sudo apt-get install -y nodejs;
sudo apt-get install -y build-essential;
sudo ln -s /usr/bin/nodejs /usr/bin/node;

# set env to prod
env NODE_ENV=production;

# install npm
echo "installing npm dependencies";
npm install;

# build dist
echo "building dist";
npm run build;

# run prod server
echo "starting server";
node server.js;