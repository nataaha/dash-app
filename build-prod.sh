#!/usr/bin/env bash
echo "Building the HISIEngine app"
echo "Preparing the install app files"
while getopts t:n:i:s: flag
do
    case "${flag}" in
        n) name=${OPTARG};;
        i) image=${OPTARG};;
        s) standalone=${OPTARG};;
        t) title=${OPTARG};;
    esac
done
if [ -d "./build" ]; then
  cd build
  AppName="${name:=ALKIP}"
  AppImage="${image:=hisengine2}"
  AppTitle="${image:=ALKIP}"
  sed -i -e "s/ALKIP/${AppName}/gI" manifest.json
  sed -i -e "s/hisengine2/${AppImage}/gI" manifest.json
  sed -i -e "s/ALKIP/${AppTitle}/gI" index.html
  cp manifest.json manifest.webapp
  rsync -ravz  static/images static
  echo "packaging the file as zip"
  zip -x *.js.map -r hisengine.zip * 
else
  echo "Build failed"
fi

