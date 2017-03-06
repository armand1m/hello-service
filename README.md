# Hello Microservice

This is a node.js microservice for the `armand1m/microservices` environment.

## Exposed methods

This project replies to the `/_v1/:who` route. It return the `:who` variable, and the hostname of the service.

It also has a `/_v1/health` route for Consul healthchecking.

## Why it exists
This project is implemented only for scalability study purposes. 

It can be used as a starter project for a new microservice as well.

This project was created from the `armand1m/microservice-barebone` project.

## Running
    $ docker-compose up

## Testing

_(soon)_

## Logging
    $ docker-compose logs
