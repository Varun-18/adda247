# Anglara Task

Welcome to the Anglara Task project! This is a Node.js application built with Express and TypeScript. This README will guide you through setting up and running the project, as well as provide examples of API responses.

## Deployment
The project has been successfully deployed on Render. Please note that the deployment is done on a free instance, which means the initial request can take up to 50 seconds for the instance to boot up and start running.
deployed url : https://anglara-task.onrender.com

## Postman Collection
[Anglara Collection & Env](https://www.postman.com/telecoms-candidate-75479556/workspace/anglara/collection/28422425-abbaf6d4-d6e4-4e06-9315-f2579d62c2c1?action=share&creator=28422425&active-environment=28422425-06d94ac3-eb40-418f-8b94-e9f903911084)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Scripts](#scripts)
- [Sample API Responses](#sample-api-responses)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [TypeScript](https://www.typescriptlang.org/) (optional, for development)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Varun-18/anglara-task.git
   cd anglara-task
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Project

To run the project in development mode, use the following command:

```bash
npm run dev
```

This will start the server using `nodemon`, which automatically restarts the server when file changes are detected.

To build the project for production, run:

```bash
npm run build
```

After building, you can start the server with:

```bash
npm start
```

## Scripts

Here are the available scripts you can use:

- `dev`: Starts the server in development mode using `nodemon`.
- `build`: Cleans the `dist` directory, compiles TypeScript files, and copies view files to the `dist` directory.
- `copyfiles`: Copies view files from `src/views` to `dist`.
- `lint`: Formats the code using Prettier and checks for linting issues with ESLint.
- `start`: Starts the server from the compiled JavaScript in the `dist` directory.
- `test`: Runs the test suite using Jest.

## Sample API Responses

Here are some sample API responses you might encounter when interacting with the application:

### User Registration

**Endpoint:** `POST /api/register`

**Request:**

```http
POST /api/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "message": "User  registered successfully",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### User Login

**Endpoint:** `POST /api/login`

**Request:**

```http
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "message": "Login successful",
}
```

### Delete Category

**Endpoint:** `DELETE /api/categories/:id`

**Request:**

```http
DELETE /api/categories/1
```

**Response:**

```json
{
  "message": "Category deleted successfully"
}
```

### Update Category

**Endpoint:** `PUT /api/categories`

**Request:**

```http
PUT /api/categories
Content-Type: application/json

{
  "id": "1",
  "name": "Updated Category Name",
  "status": "active"
}
```

**Response:**

```json
{
  "message": "Category updated successfully"
}
```

### Create Category

**Endpoint:** `POST /api/categories`

**Request:**

```http
POST /api/categories
Content-Type: application/json

{
  "name": "New Category",
  "parent": "1"
}
```

**Response:**

```json
{
  "message": "Category created successfully",
  "newCategory": {
    "id": "2",
    "name": "New Category",
    "parent": "1",
    "status": "active"
  }
}
```

## API Endpoints

Here’s a summary of the main API endpoints available in the application:

- **User Registration:** `POST /user/register`
- **User Login:** `POST /user/login`
- **Delete Category:** `DELETE /category/:id`
- **Update Category:** `PUT /category`
- **Create Category:** `POST /category`
- **Get Categories:** `GET /category`

## Contributing

Contributions are welcome! If you have suggestions for improvements or find bugs, please open an issue or submit a pull request.

---
