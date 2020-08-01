#!/usr/bin/env bash

echo "$GH_TOKEN" | docker login -u lfmachadodasilva --password-stdin docker.pkg.github.com
docker tag $GITHUB_REPOSITORY:$GITHUB_RUN_NUMBER docker.pkg.github.com/$GITHUB_REPOSITORY/${GITHUB_REF##*/}:$GITHUB_RUN_NUMBER
docker tag $GITHUB_REPOSITORY:$GITHUB_RUN_NUMBER docker.pkg.github.com/$GITHUB_REPOSITORY/${GITHUB_REF##*/}:latest
docker push docker.pkg.github.com/$GITHUB_REPOSITORY/${GITHUB_REF##*/}:$GITHUB_RUN_NUMBER
docker push docker.pkg.github.com/$GITHUB_REPOSITORY/${GITHUB_REF##*/}:latest