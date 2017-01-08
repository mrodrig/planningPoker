FROM node:7.4.0-slim
MAINTAINER mrodrig

WORKDIR /tmp

# Set environment variables
#  NODE_PATH - location for global modules
#  NODE_ENV  - environment value
ENV NODE_PATH=/usr/local/lib/node_modules \
    NODE_ENV=local

# Update and upgrade all packages to ensure latest security patches are installed
# Also, install git in case it isn't already installed
# Finally, delete the apt lists to free up as much space as possible
RUN apt-get update && apt-get upgrade -y && \
    apt-get -q -y install git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Application Port
EXPOSE 8080

# Add the package.json file, then proceed to install the grunt cli globally
# Then, install the remaining packages
ADD package.json /app/
RUN npm install -g grunt-cli && \
    npm install

# Add the application source code
ADD . /app

# Finish by running the setup script
RUN npm run setup