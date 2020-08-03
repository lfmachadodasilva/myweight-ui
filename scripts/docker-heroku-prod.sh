#!/usr/bin/env bash

docker tag $GITHUB_REPOSITORY:$GITHUB_RUN_NUMBER web
heroku container:push web --app $HEROKU_APP_NAME
heroku container:release web --app $HEROKU_APP_NAME