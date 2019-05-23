# Goodcity Dashboard

## Prequisites

The goodcity dashboard uses GraphQL subscriptions to retrieve data and to live update.

We use a hasura server as our way of creating a GraphQL server from our Postgres database

To run the Hasura server on your local machine :

```bash
#! /bin/bash
docker run -d -p 8080:8080 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://postgres:@host.docker.internal:5432/goodcity_server_development \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       hasura/graphql-engine:latest
```


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
