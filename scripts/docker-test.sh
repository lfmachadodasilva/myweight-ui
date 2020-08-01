#!/usr/bin/env bash

docker build . --target test -t test:$GITHUB_RUN_NUMBER --cache-from build:$GITHUB_RUN_NUMBER
docker run --rm -i -v $PWD/coverage:/app/coverage test:$GITHUB_RUN_NUMBER