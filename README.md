# NestJS MongoDB CRUD

This is a simple CRUD application built with NestJS and MongoDB.

## Description

This project demonstrates a basic CRUD (Create, Read, Update, Delete) application using NestJS and MongoDB. It includes user management functionalities such as creating, retrieving, updating, and deleting users.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/nestjs-mongo-crud.git
   cd nestjs-mongo-crud
   ```

   Install the dependencies:

Start the MongoDB server (make sure MongoDB is installed and running on your machine):

```sh
mongod
```

Running the app

## Development

```sh
npm run start
```

## Watch mode

```sh
npm run start:dev
```

## Production mode

```sh
npm run start:prod
```

# Test

## Unit tests

```sh
npm run test
```

## e2e tests

```sh
npm run test:e2e
```

## Test coverage

```sh
npm run test:cov
```

## API Endpoints

- `POST /users` - Create a new user
- `GET /users` - Retrieve all users
- `GET /users/:id` - Retrieve a user by ID
- `PUT /users/:id` - Update a user by ID
- `DELETE /users/:id` - Delete a user by ID
