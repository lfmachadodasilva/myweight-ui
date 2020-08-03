#!/usr/bin/env bash

# already done by docker-heroku-dev.sh
# wget -qO- https://cli-assets.heroku.com/install.sh | sh
# echo "$HEROKU_PASSWORD" | docker login -u "$HEROKU_USERNAME" --password-stdin registry.heroku.com

docker tag $GITHUB_REPOSITORY:$GITHUB_RUN_NUMBER registry.heroku.com/$HEROKU_APP_NAME/web
docker push registry.heroku.com/$HEROKU_APP_NAME/web
heroku container:release web --app $HEROKU_APP_NAME