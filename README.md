# Goodcity Dashboard

## Prequisites

The goodcity dashboard uses GraphQL subscriptions to retrieve data and to live update.

We use a hasura server as our way of creating a GraphQL server from our Postgres database

In order to run hasura on your local machine, you'll need to:
* Install docker
  * https://docs.docker.com/install/

* Run the hasura docker container 
  * Tutorial available here : https://docs.hasura.io/1.0/graphql/manual/deployment/docker/index.html
  * A script is available in the `hasura/` folder with the run command as reference, it'll need to point to your local postgres instance
  
* Configure hasura
  * Open the hasura dashboard (localhost:8080) and upload the `hasura/metadata`
  * If any changes are made to the relationships, please export a new metadata file and replace the existing one

## Building the project

```bash
yarn install
```

```bash
yarn build
```

## Running in development mode (auto-reload)

```bash
yarn dev
```
