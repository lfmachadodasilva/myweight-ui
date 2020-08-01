#!/usr/bin/env bash

docker build . --target final -t $GITHUB_REPOSITORY:$GITHUB_RUN_NUMBER --cache-from build:$GITHUB_RUN_NUMBER