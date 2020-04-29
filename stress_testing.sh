#! /bin/bash

echo '{"login":"new user","password":"new password"}' > ./user.json
ab -c 100 -n 10000 -T application/json -p user.json http://localhost:8080/api/auth/login > stress_test
rm ./user.json

grep "Requests per second:" stress_test | RPS=$(grep -o -E '[0-9.]+')

echo $RPS

