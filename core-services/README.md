# Core Services

Basically a YAML file defining services and its configurations. Can be extended by Docker Compose files to recreate the core environment needed to run microservices independently for development in an environment that is similar to its production environment, without needing to run all services.

You have:

- RethinkDB: `rethinkdb_service`
- Consul: `consul_service`
- Fabio: `fabio_service`

Microservices must import it using git submodule and extend the `services.yml`:

`git submodule add https://github.com/armand1m/core-services.git` 

```yml
version: '2'
services:
  my-service_database:
    extends:
      file: ./core-services/services.yml
      service: rethinkdb_service
    volumes:
      - ./my-service/data:/data

  consul:
    extends:
      file: ./core-services/services.yml
      service: consul_service

  gateway:
    extends:
      file: ./core-services/services.yml
      service: fabio_service
    links:
      - consul
```