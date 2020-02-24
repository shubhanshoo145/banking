#!/bin/bash

nodeEnv='preprod';
tag='latest';

# read variables

read -p "Enter NODE_ENV (default: $nodeEnv):" nodeEnvInput
if [ -n "$nodeEnvInput" ]
then
  nodeEnv=$nodeEnvInput;
else
  printf "using default\n"
fi

read -p "Enter IMAGE TAG: (default: $tag):" tagInput
if [ -n "$tagInput" ]
then
  tag=$tagInput;
else
  printf "using default\n"
fi

mkdir 'env'

#cache env file
oldEnvFile=$(<env/index.js)

#create new env file
printf "module.exports = {
  NODE_ENV: '$nodeEnv',
};" > env/index.js

docker build . -f ./dockerfile-deploy -t 330741986720.dkr.ecr.eu-west-1.amazonaws.com/masspay-reuters:$nodeEnv-latest
docker tag 330741986720.dkr.ecr.eu-west-1.amazonaws.com/masspay-reuters:$nodeEnv-latest 330741986720.dkr.ecr.eu-west-1.amazonaws.com/masspay-reuters:$nodeEnv-$tag
docker push 330741986720.dkr.ecr.eu-west-1.amazonaws.com/masspay-reuters:$nodeEnv-$tag

#retrieve old env file
printf "$oldEnvFile" > env/index.js