#!/usr/bin/env bash

# Simulates the idea of updating the version comment in OZ contracts
echo $(node --print --eval "require('./package.json').version") > .version
