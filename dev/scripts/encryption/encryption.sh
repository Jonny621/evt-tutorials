#!/usr/bin/env bash
set -Eeuo pipefail

LOGDIR='./devdata/logs/encryption.log'

execute_command() {
    EX_NAME=$1
    shift
    CMD="$EX_NAME $@ >> $LOGDIR 2>&1"
    echo "executing: $CMD"
    echo "$CMD" >> "$LOGDIR"
    eval "$CMD &"
}

sleeping() {
   echo sleeping $1
   sleep $1
}

option=$1

_args="${@:2:$#}"

# Deploy contract
case $option in
    'deploy'):
        execute_command ./scripts/encryption/deploy_encryption.sh
    ;;
    'call'):
        execute_command ./scripts/encryption/call_encryption.sh $_args
    ;;
    'test'):
        execute_command ./scripts/test_encryption.sh
esac





