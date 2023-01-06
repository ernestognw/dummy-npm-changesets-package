#!/usr/bin/env bash

set -o errexit

CHANGESETS_STATUS_JSON="./status.json"
npx changeset status --output="$CHANGESETS_STATUS_JSON"
RELEASES=$(node --print --eval "require('$CHANGESETS_STATUS_JSON').releases")
npx changeset status --output="$CHANGESETS_STATUS_JSON"
if [ $(node --print --eval "$RELEASES.length") != 1 ]; then exit 1; fi;
NEW_VERSION=$(node --print --eval "($RELEASES)[0].newVersion")
rm $CHANGESETS_STATUS_JSON

# Simulates the idea of updating the version comment in OZ contracts
echo $NEW_VERSION > .version
