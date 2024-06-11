#!/bin/bash
#Only run this if you don't already have a https cert running for your machine
ca_file_venv_loc=../../venv/lib/python3.10/site-packages/certifi/cacert.pem

if ! test -f ssl/certs/localhost.crt ; then
  cat '01' > serial.txt
  touch index.txt
  openssl req -x509 -config openssl-ca-1.cnf -days 365 -newkey rsa:4096 -sha256 -nodes -out certs/localhost-ca.crt -outform PEM
  openssl req -config openssl.cnf -newkey rsa:2048 -sha256 -nodes -out certs/localhost.csr -outform PEM
  openssl ca -config openssl-ca-2.cnf -policy signing_policy -extensions signing_req -out certs/localhost.crt -infiles certs/localhost.csr
  cp $ca_file_venv_loc ${ca_file_venv_loc}.backup
  openssl x509 -in certs/localhost-ca.crt -text >> ${ca_file_venv_loc}
  rm certs/localhost.csr
  rm index*
  rm serial*
  rm certs/localhost-ca*
  rm certs/01.pem
fi