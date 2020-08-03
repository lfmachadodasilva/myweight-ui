#!/usr/bin/env bash

docker tag $GITHUB_REPOSITORY:$GITHUB_RUN_NUMBER registry.heroku.com/$HEROKU_APP_NAME-dev/web
# docker push registry.heroku.com/$HEROKU_APP_NAME-dev/web
heroku container:push web --app $HEROKU_APP_NAME-dev
heroku container:release web --app $HEROKU_APP_NAME-dev
