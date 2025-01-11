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

2. Install the dependencies:

```sh
npm install
```

3. Start the MongoDB server (make sure MongoDB is installed and running on your machine):

```sh
mongod
```

Running the app

```sh
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```sh
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## API Endpoints

- `POST /users` - Create a new user
- `GET /users` - Retrieve all users
- `GET /users/:id` - Retrieve a user by ID
- `PUT /users/:id` - Update a user by ID
- `DELETE /users/:id` - Delete a user by ID
