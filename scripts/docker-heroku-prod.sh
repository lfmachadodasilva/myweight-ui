#!/usr/bin/env bash

wget -qO- https://cli-assets.heroku.com/install.sh | sh
docker login --username=_ --password=$HEROKU_API_KEY registry.heroku.com

docker tag $GITHUB_REPOSITORY:$GITHUB_RUN_NUMBER web
heroku container:push web --app $HEROKU_APP_NAME
heroku container:release web --app $HEROKU_APP_NAME