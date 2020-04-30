#!/usr/bin/env bash

echo '{"login":"default_user","password":"default_password"}' > ./user.json
ab -c 100 -n 10000 -T application/json -p user.json http://127.0.0.1:"${NODE_PORT}"/api/auth/login > stress_test
rm ./user.json

grep "Requests per second:" stress_test | RPS=$(grep -o -E '[0-9.]+')

echo $RPS

