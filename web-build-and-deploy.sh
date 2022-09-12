#!/usr/bin/env bash

set -eu

env=${1:-}
[ -z "$env" ] && echo "Usage: ./$(basename "$0") <environment>" >&2 && exit 1;

set -x

# build
npm run build:web:${env}
# deploy
wrangler publish --env $env
