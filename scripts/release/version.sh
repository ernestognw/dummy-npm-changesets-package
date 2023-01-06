#!/usr/bin/env bash

set -o errexit

RELEASES=$(node --print --eval "require('$CHANGESETS_STATUS_JSON').releases")
if [ $(node --print --eval "$RELEASES.length") != 1 ]; then
  echo "::error file=$CHANGESETS_STATUS_JSON::The status doesn't contain only 1 release"
  exit 1;
fi;
NEW_VERSION=$(node --print --eval "($RELEASES)[0].newVersion")

# Simulates the idea of updating the version comment in OZ contracts
echo NEW_VERSION > .version
