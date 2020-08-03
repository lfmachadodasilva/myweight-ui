#!/usr/bin/env bash

docker push docker.pkg.github.com/$GITHUB_REPOSITORY/myweight-ui_${GITHUB_REF##*/}:$GITHUB_RUN_NUMBER