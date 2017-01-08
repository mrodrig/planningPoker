# Planning Poker App

Version `0.0.4`

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
wget https://codeload.github.com/mrodrig/planningPoker/zip/0.0.4
unzip 0.0.4
cd planningPoker-0.0.4
npm run setup
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