# tjekket.dk Coding Challenge
- The challenge consists of creating a simple REST-based API. Using NodeJS you should create a REST API for a simple shopping list, that can be run locally on a development machine.

[Root demo site](https://tjekket-server.hostman.site/)

[Catalog example](https://tjekket-server.hostman.site/catalog/5f0870a0f140b82b98b1930b)

## Introduction
This repository is intended to be used as a stand-alone API server that uses JWT tokens to provide a session-less shopping service, as well as to demonstrate RESTful design patterns.

## Pre-requisites
1. A mongoDB instance with URI access
2. NodeJs
3. NPM
4. (optionally hosting provider)

## Setup
1. Clone this repository
2. `npm install`
3. Setup environment variable as defined in the next section
4. `npm run start`
5. (optionally run `npm run test` to perform End-To-End testing)

### Environment variables
```PORT=80
MONGODB_URI=mongodb+srv://<user>:<password>@<dbhost>/<database>?retryWrites=true&w=majority
JWT_SECRET=<a long and well-kept secret>
OWNER_EMAIL=<name@domain.tld>*
```
*: User made with this email will become elevated to owner upon [registering](doc/user/put.md)

## Public endpoints
These endpoints require no Authentication
* [Read Catalog](doc/catalog/get.md) : GET `/catalog/{catalogid}`
* [Read Item](doc/item/get.md) : GET `/item/{itemid}`
* [Login & Registration](doc/user/put.md) : PUT `/user`

## Endpoints that require Authentication
Closed endpoints require a valid JWT token in the Authentication header of the request.

A token can be acquired from the [Login & Registration](user/put.md) endpoint

Requests are further divided in roles `owner` <- `admin` <- `user`

## User related
* [Get specific user](doc/user/get.md) : GET `/user/{userid}`
* [Update user](doc/user/post.md) : POST `/user`
* [Delete user](doc/user/delete.md) : DELETE `/user`

## Catalog related
* [Create empty catalog](doc/catalog/put.md) : PUT `/catalog`
* [Update catalog](doc/catalog/post.md) : POST `/catalog`
* [Delete catalog](doc/catalog/delete.md) : DELETE `/catalog`

## Item related
* [Create new item](doc/catalog/put.md) : PUT `/item`
* [Update item](doc/catalog/post.md) : POST `/item`
* [Delete item](doc/catalog/delete.md) : DELETE `/item`