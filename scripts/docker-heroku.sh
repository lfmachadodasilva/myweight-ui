#!/usr/bin/env bash

wget -qO- https://cli-assets.heroku.com/install.sh | sh
echo "$HEROKU_API_KEY" | docker login -u "_" --password-stdin registry.heroku.com