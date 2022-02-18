#!/usr/bin/env bash
 echo "Run the application with nginx"
 if [ -d "./build" ]; then
    docker build --no-cache -f Dockerfile -t $CI_REGISTRY/hisengine/his_dashboard .
    docker push $CI_REGISTRY/hisengine/his_dashboard
 else
   echo "Build failed"
 fi