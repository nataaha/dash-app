#!/usr/bin/env bash
 echo "Building the HISIEngine app"
 apt-get update -y && apt install -y zip && apt-get install rsync -y
 echo "Preparing the install app files"
 if [ -d "./build" ]; then
   cd apps/dashboard/build
   cp manifest.json manifest.webapp
   rsync -ravz  static/images static
   echo "packaging the file as zip"
   zip -r hisengine.zip *
   #zip -r hisengine.zip * -x "*.js.map" -x "*.css.map" -x "runtime*.js" -x "asset-manifest.json"
   cd ~
   ls -l
   echo "####### Syncing distribution files ######"
   #rsync --delete -arvz build/ dist
   #cd ..
   #if [ -d "his-iengine/releases/dist" ]; then
   #  echo "####### Docker distribution files ######"
   #  rsync --delete -arvz --exclude "*.js.map" --exclude "*.css.map" --exclude "runtime*.js" --exclude "asset-manifest.json" dashboard/dist/ his-iengine/releases/dist
   #fi
 else
   echo "Build failed"
 fi
