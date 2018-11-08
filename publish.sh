#!/bin/bash

TAG_NAME=$1;

if [ "$TAG_NAME" == '' ]
then
  echo "Please pass your tag name as an argument"
  exit 1
fi

docker build --no-cache -t hharnisc/kube-scope-cli:$TAG_NAME .
docker push hharnisc/kube-scope-cli:$TAG_NAME
