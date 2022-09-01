#!/usr/bin/env bash
set -Eeuo pipefail

sleeping() {
   echo sleeping $1
   sleep $1
}

exec node ./src/encryption/test.js

