#!/bin/bash
#Only run this if you don't already have a https cert running for your machine
if ! test -f ssl/localhost.pem ; then
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/localhost.key -out ssl/localhost.pem -config req.cnf -sha256
fi