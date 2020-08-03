#!/usr/bin/env bash

docker tag $GITHUB_REPOSITORY:$GITHUB_RUN_NUMBER registry.heroku.com/$HEROKU_APP_NAME/web
docker push registry.heroku.com/$HEROKU_APP_NAME/web
heroku container:release web --app $HEROKU_APP_NAME