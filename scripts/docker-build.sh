#!/usr/bin/env bash

docker build . --target build -t build:$GITHUB_RUN_NUMBER