#!/bin/sh

rm -rf coverage

dtsm install
npm run build

NODE_PATH=lib \
istanbul cover --report json node_modules/.bin/_mocha -- test/**/*.ts

remap-istanbul -i coverage/coverage-final.json -o coverage/lcov.info -t lcovonly
remap-istanbul -i coverage/coverage-final.json -o coverage -t html
