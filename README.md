# Goodcity Dashboard

[![forthebadge](https://forthebadge.com/images/badges/built-with-science.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com)

## Building the project

```bash
nvm install v18.17.1
yarn install
yarn build
```

## Running in development mode (auto-reload)

```bash
yarn dev
```

## Deploying the project

* Commit to git
* CircleCI will build the project on master and live branches
* Deployment: push to live branch for live deployment (CircleCI will deploy to an Azure Storage Blob set up for hosting static content.)
