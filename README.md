# Planning Poker App

Version `1.0.0`

## Overview

Are you tired of using physical cards for your planning/sizing sessions?

Wish there was an interactive version instead that helped you determine the average, closest, and median sizes? That's not a problem.

Have strange story sizes? No problem.  The app allows you to easily customize them.

This app can help you to simplify and streamline your agile planning session.

Here are some app features:
* Can be run with or without [Docker](https://www.docker.com/)
* Utilizes [Socket.io](https://www.npmjs.com/package/socket.io) for real-time updates
* Includes connection error handling to automatically re-connect clients if network blips occur

## Screenshots

### User View

Unrevealed sizes:

![User View (unrevealed sizes)](https://github.com/mrodrig/planningPoker/raw/master/screenshots/attendeeUnrevealed.png)

Revealed sizes:

![User View (revealed sizes)](https://github.com/mrodrig/planningPoker/raw/master/screenshots/attendeeRevealed.png)

### Presentation View

Unrevealed sizes:

![Presentation View (unrevealed sizes)](https://github.com/mrodrig/planningPoker/raw/master/screenshots/presentationUnrevealed.png)

Revealed sizes:

![Presentation View (revealed sizes)](https://github.com/mrodrig/planningPoker/raw/master/screenshots/presentationRevealed.png)

## Setup

### Git

```bash
git clone https://github.com/mrodrig/planningPoker.git
cd planningPoker
npm run setup
npm start
```

### GitHub Release

```bash
wget https://codeload.github.com/mrodrig/planningPoker/zip/1.0.0
unzip 1.0.0
cd planningPoker-1.0.0
npm run setup
npm start
```

### Docker

```bash
git clone https://github.com/mrodrig/planningPoker.git
cd planningPoker
docker build -t planning .
docker/start.sh
docker/setup.sh
npm start
```

## Customizing

Have special sizes that you would like to use?  That's completely possible with this app.

Just open `app/lib/envConfig.js` and change the `cardSizes` property to include your options!

Proceed to start the app and your custom sizes should now appear.

## Running

```bash
npm start
```

## Updating

### Git

```bash
git pull origin master
npm run setup
```

### GitHub Release

Unfortunately there is no easy way to update a version which was installed via a Github release.

The simplest way to update would be to delete the directory and install the new version.

## Testing

```bash
grunt test
```