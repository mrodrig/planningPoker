# Starts the Docker container with the appropriate configurations and mappings
#!/bin/bash

APPLICATION_PORT=8080
PROJECT_NAME="planning"
APP_SOURCE_CODE_DIR=$(pwd)

echo "Starting docker image: $PROJECT_NAME."
echo "  Run './docker/setup.sh' to install dependencies, generate necessary files, etc"

docker run -it \
    --rm \
    --publish=$APPLICATION_PORT:8080 \
    --env=NODE_ENV=local \
    --volume=$APP_SOURCE_CODE_DIR:/app \
    --name $PROJECT_NAME \
    $PROJECT_NAME \
    /bin/bash