#!/usr/bin/env bash

wget -qO- https://cli-assets.heroku.com/install.sh | sh
docker login --username=_ --password=$HEROKU_API_KEY registry.heroku.com