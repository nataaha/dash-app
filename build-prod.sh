#!/usr/bin/env bash
 echo "Building the HISIEngine app"
 #apt-get update -y && apt install -y zip && apt-get install rsync -y
 echo "Preparing the install app files"
 if [ -d "./build" ]; then
   cd build
   cp manifest.json manifest.webapp
   rsync -ravz  static/images static
   echo "packaging the file as zip"
   zip -r hisengine.zip *
 else
   echo "Build failed"
 fi
