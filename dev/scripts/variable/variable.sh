#!/usr/bin/env bash
set -Eeuo pipefail

LOGDIR='./devdata/logs/variable.log'

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
        execute_command ./scripts/variable/deploy_variable.sh
    ;;
    'call'):
        execute_command ./scripts/variable/call_variable.sh $_args
esac





