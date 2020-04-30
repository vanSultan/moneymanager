#!/usr/bin/env bash

curl -d '{"login":"stress_user","password":"stress_pwd"}' -H 'Content-Type: application/json' -H 'Accept: application/json' 
    http://127.0.0.1:"${NODE_PORT}"/api/auth/register

echo '{"login":"stress_user","password":"stress_pwd"}' > ./user.json
ab -c 100 -n 10000 -T application/json -p user.json http://127.0.0.1:"${NODE_PORT}"/api/auth/login > stress_test
rm ./user.json

RPS=$( grep "Requests per second:" stress_test | grep -o -E '[0-9.]+' )

echo ${RPS}

