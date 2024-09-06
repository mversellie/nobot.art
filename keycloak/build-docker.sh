#!/bin/bash
HOST="registry.digitalocean.com/nobot-art"
VERSION=$1
TAG_PREFIX="$HOST/keycloak"
TAG_VERSION="$TAG_PREFIX:$VERSION"
TAG_LATEST="$TAG_PREFIX:latest"
docker build -t "$TAG_LATEST" -t "$TAG_VERSION" .
docker push "$TAG_LATEST"
docker push "$TAG_VERSION"