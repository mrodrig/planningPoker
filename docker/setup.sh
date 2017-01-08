# Installs the necessary dependencies and generates the appropriate files
#!/bin/bash

set -o nounset
set -o errexit

# Run Setup Scripts
npm run setup

# docker volumes will be written as root
# TODO way around this?
chmod -R a+rwx node_modules app/public