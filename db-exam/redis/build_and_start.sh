#!/bin/bash
#
# desc.: For development

set -euo pipefail

THIS="Redis CI Script"
DIRNAME=$(dirname $0)
IMAGE_NAME="my-redis-image:1.0"

cd $DIRNAME

log() {
    echo -e "\033[1;32m[ ${THIS} ]\033[0m $1"
}

log_command() {
    "$@" 2>&1 | while IFS= read -r line; do
        log "$line"
    done
}

log_command docker stop $(docker ps -aq -f ancestor=$IMAGE_NAME) 2>/dev/null || true
log_command docker rmi $IMAGE_NAME 2>/dev/null || true
log_command docker build -f "Dockerfile.dev" -t $IMAGE_NAME .
log_command docker run -d \
    --rm -p "6379:6379" \
    -v "$(pwd)/logs:/var/log/redis" \
    --env-file ".env.dev" \
    $IMAGE_NAME

log "실행 완료"