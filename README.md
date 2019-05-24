# Goodcity Dashboard

## Prequisites

The goodcity dashboard uses GraphQL subscriptions to retrieve data and to live update.

We use a Hasura server (https://hasura.io) as our way of creating a GraphQL server from our Postgres database

In order to run hasura on your local machine, you'll need to:
* Install docker
  * https://docs.docker.com/install/

* Run the hasura docker container 
  * Tutorial available here : https://docs.hasura.io/1.0/graphql/manual/deployment/docker/index.html
  * A script is available in the `hasura/` folder with the run command as reference, it'll need to point to your local postgres instance
  
* Configure hasura
  * Open the hasura dashboard (localhost:8080) and upload the `hasura/metadata`
  * If any changes are made to the relationships, please export a new metadata file and replace the existing one

## GraphQL

To understand the capabilities of the GraphQL and how to write queries, you can refer to the [Hasura documentation](https://docs.hasura.io/1.0/graphql/manual/queries/index.html)

The GraphQL client we use to connect to hasura is Appollo, it is documented here: https://vue-apollo.netlify.com

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
