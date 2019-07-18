# Deploying Hasura

Ansible playbook used to deploy Hasura

The playbook will:

- Install docker
- Run a Hasura docker container
- Add the nginx reverse-proxy configuration
- Restart nginx


## Prerequisites

- Install [Ansible](www.ansible.com) on your local machine
- Install sshpass (for password authentication only)

## Creating a readonly Hasura user for the database

```sql
-- We will create a separate user and grant permissions on hasura-specific
-- schemas and information_schema and pg_catalog
-- These permissions/grants are required for Hasura to work properly.

-- create a separate user for hasura
CREATE USER hasura WITH PASSWORD 'hasura';

-- create pgcrypto extension, required for UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- create the schemas required by the hasura system
-- NOTE: If you are starting from scratch: drop the below schemas first, if they exist.
CREATE SCHEMA IF NOT EXISTS hdb_catalog;
CREATE SCHEMA IF NOT EXISTS hdb_views;

-- make the user an owner of system schemas
ALTER SCHEMA hdb_catalog OWNER TO hasura;
ALTER SCHEMA hdb_views OWNER TO hasura;

-- grant select permissions on information_schema and pg_catalog. This is
-- required for hasura to query list of available tables
GRANT SELECT ON ALL TABLES IN SCHEMA information_schema TO hasura;
GRANT SELECT ON ALL TABLES IN SCHEMA pg_catalog TO hasura;

-- Below permissions are optional. This is dependent on what access to your
-- tables/schemas - you want give to hasura. If you want expose the public
-- schema for GraphQL query then give permissions on public schema to the
-- hasura user.
-- Be careful to use these in your production db. Consult the postgres manual or
-- your DBA and give appropriate permissions.

-- grant all privileges on all tables in the public schema. This can be customised:
-- For example, if you only want to use GraphQL regular queries and not mutations,
-- then you can set: GRANT SELECT ON ALL TABLES...
GRANT USAGE ON SCHEMA public TO hasura;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO hasura;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO hasura;

-- Similarly add this for other schemas, if you have any.
-- GRANT USAGE ON SCHEMA <schema-name> TO hasura;
-- GRANT ALL ON ALL TABLES IN SCHEMA <schema-name> TO hasura;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA <schema-name> TO hasura;
```

## Deployment

### About ansible

Ansible is an automation tool which runs on remote hosts via SSH.
It requires a `hosts` file which lists all the servers we wish to run our setup on.

Unlike a normal script, each `task` specified in the `playbook` will only run if ansible detects it is not in the intended state.
This behaviour makes it safe to run multiple times.

Version at time of writing `2.8.2`

### Configure the remote hosts

Use the sample `hosts.yml` file as a template to setup the server(s) you wish to configure

It should look something like this :

```yaml
all:
  hosts:
    staging.app.com:
  vars:
    # SSH User
    ansible_user: systemuser
    # SSH Port
    ansible_port: 22
    # Domain for nginx reverse proxy
    SERVICE_URL: gql.staging.app.com
    # Database Hasura should connect to
    POSTGRES_URL: postgres://<hasurauser>:<hasurapassword>@<postgres host>:<postgres port>/<database_name>
    # Whitelisted Ips
    ALLOWED_IPS:
      - 2.4.5.6
      - 7.8.9.10
```

### Run the ansible playbook against the hosts

```bash
$ ansible-playbook -i ./hosts.yml deploy.yml --ask-become-pass
```

Notes:
  - `--ask-become-pass` prompts us to enter the `sudo` password. Remove the option if that is not needed
  - If you are authenticating with SSH using a password, add the `--ask-pass` option

### Sample output

<img width="842" alt="Screenshot 2019-07-18 at 11 51 47 AM" src="https://user-images.githubusercontent.com/1822532/61427957-ab6d7300-a952-11e9-9c79-eadc861ba8e6.png">


Notes:
  - `'ok'` indicates that Ansible found the task to already be in the desired that, nothing was therefore exectuted
  - `'changed'` indicates that the task was not setup, or wrongly setup. It is therefore exectuted to match the desired state




