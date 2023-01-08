#!/usr/bin/env bash

# Simulates the idea of updating the version comment in OZ contracts
echo $(node --print --eval "require('./package.json').version") > .version

# Formats CHANGELOG.md
CHANGELOG=$(cat ./CHANGELOG.md)
echo "$(node ./scripts/release/format-changelog.js "$CHANGELOG")" > CHANGELOG.md
