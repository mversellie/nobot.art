#!/bin/bash
#Only run this if you don't already have a https cert running for your machine
#You will need to run this as root to access the place where trusted root certs are stored
#This script only works on Ubuntu or Debian with 'sudo' installed
ca_file_venv_loc=../throwback-api/venv/lib/python3.10/site-packages/certifi/cacert.pem
ca_file_venv_loc_64=../throwback-api/venv/lib64/python3.10/site-packages/certifi/cacert.pem
system_trust_store=/usr/local/share/ca-certificates

function writeRootToPython(){
  if test -f "${1}.backup" ; then
    echo "looks like you already have a backup of $1 , restoring the backup.}"
    cp "${1}.backup" "$1"
  fi
  echo "Adding root cert to Venv trust store at $1"
  openssl x509 -in certs/localhost-ca.crt -text >> "$1"
}

if ! test -f ssl/certs/localhost.crt ; then
  #setup
  echo '01' >> serial.txt
  touch index.txt
  echo 'Generating Root Cert'
  openssl req -x509 -config openssl-ca-1.cnf -days 365 -newkey rsa:4096 -sha256 -nodes -out certs/localhost-ca.crt -outform PEM
  echo 'Generating Localhost Cert'
  openssl req -config openssl.cnf -newkey rsa:2048 -sha256 -nodes -out certs/localhost.csr -outform PEM
  echo 'Signing Localhost Cert'
  openssl ca -config openssl-ca-2.cnf -policy signing_policy -extensions signing_req -out certs/localhost.crt -infiles certs/localhost.csr
  echo 'Certificates Generated Successfully'
  echo 'Cleaning up useless files'
  rm index*
  rm serial*
  rm certs/01.pem
  echo 'Backing Up Python Trusted Certs'
  cp "$ca_file_venv_loc" "${ca_file_venv_loc}.backup"
  cp "$ca_file_venv_loc_64" "${ca_file_venv_loc_64}.backup"
  echo 'Adding Root Cert To Python Trusted Certs'
  writeRootToPython "$ca_file_venv_loc"
  writeRootToPython "$ca_file_venv_loc_64"
  echo 'Root Certificate installed to Venv.'
  echo 'Adding Root Cert To System Trusted Certs(You need root for this)'
  sudo cp certs/localhost-ca.crt "$system_trust_store"
  sudo update-ca-certificates
  echo 'Fixing certificate permissions'
  sudo chmod -R 666 certs/*
  echo 'Certificates Generated and Root Certificate installed to Venv and System Trusted'
else
  echo 'You already have a localhost certificate generated.  Use them or delete them in ssl/certs'
fi