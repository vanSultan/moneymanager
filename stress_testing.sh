#!/bin/bash/

echo "{\"login\":\"default_user\",\"password\":\"default_password}" > ./user.json
RPS=$( ab -c 100 -n 10000 -H 'Content-Type: application/json' -H 'Accept: application/json' -p ./user.json http://127.0.0.1:"${NODE_PORT}"/api/auth/login | grep "Requests per second:" | grep -o -E "[0-9.]+" )
rm ./user.json

if [ $(echo "$RPS>200.0"|bc) -ne 0 ]
then
  exit 0
else
  exit 1
fi
