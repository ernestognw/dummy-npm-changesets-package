#!/usr/bin/env bash

set -euo pipefail -x

# Simulates the idea of updating the version comment in OZ contracts
echo $(node --print --eval "require('./package.json').version") > .version
