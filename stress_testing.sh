#!/usr/bin/env bash

#curl -d "{\"login\":\"stress_user\",\"password\":\"stress_pwd\"}" -H 'Content-Type: application/json' -H 'Accept: application/json' -X POST http://127.0.0.1:${NODE_PORT}/api/auth/register
#
echo "{\"login\":\"default_user\",\"password\":\"default_password}" > ./user.json
#echo "{\"login\":\"default_user\",\"password\":\"default_password}"
RPS=$( ab -c 100 -n 10000 -H 'Content-Type: application/json' -H 'Accept: application/json' -p ./user.json http://127.0.0.1:"${NODE_PORT}"/api/auth/login | grep "Requests per second:" | grep -o -E "[0-9.]+" )
rm ./user.json

#RPS=${RPS} | awk '{print int($0)}'
#echo ${RPS}
#
#if [ "$RPS" < 200 ]; then
#  exit 1
#fi
