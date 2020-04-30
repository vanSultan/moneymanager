#!/usr/bin/env bash

curl -d "{\"login\":\"stress_user\",\"password\":\"stress_pwd\"}" -H 'Content-Type: application/json' -H 'Accept: application/json' -X POST http://127.0.0.1:${NODE_PORT}/api/auth/register

echo "{\"login\":\"stress_user\",\"password\":\"stress_pwd\"}" > ./user.json
RPS=$( ab -c 100 -n 10000 -T application/json -p user.json http://127.0.0.1:${NODE_PORT}/api/auth/login | grep "Requests per second:" | grep -o -E "[0-9.]+" )
rm ./user.json

echo ${RPS}
