# MyApp Listing API

This is the backend API for the MyApp Listing application. It provides endpoints for managing users, authentication, and app links.

The login information provided is the default login when the app is initialized

## Technologies Used

- Node.js
- Express.js
- Sequelize (with MySQL)
- Yarn
- Jest (for testing)
- ESLint (for linting)
- dotenv (for environment variables)
- morgan (for logging)
- cors (for handling cross-origin resource sharing)

## Getting Started

### Prerequisites

- Node.js
- Yarn (optional, you can use npm if preferred)
- MySQL


### Installation

1. **Clone the repository:**

2. **Routes:**

# API Endpoints

## Account and Authentication

### 1. Login

- **Endpoint:** POST `/login`
- **Request Body:**
  ```json
    {
    "email":"admin@example.com",
    "password":"adminpassword"
    }

  Use token for verification - Set Authorization Header - Bearer **token**
### 2. Get Users (Only an admin can add another)

- **Endpoint:** POST `/users`

### 3. Add User (Only an admin can add another)

- **Endpoint:** POST `/users/add`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "isAdmin": true
  }

  ### 2. Update User (Only an admin can update)

- **Endpoint:** PUT `/users/:id`
- **Request Body:**
  ```json
  {
    "id":1
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "isAdmin": true
  },

    ### 3. Delete User (Only an admin can delete)

- **Endpoint:** DELETE `/users/:id`


## App Links

### 1. Login

- **Endpoint:** POST `/login`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
### 2. Get Users (Only an admin can add another)

- **Endpoint:** POST `/apps`

  Use token for verification - Set Authorization Header - Bearer **token**
### 3. Add User (Only an admin can add another)

- **Endpoint:** POST `/apps/add`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "icon": "john@example.com",
    "url": "http://google.com"
  }

  ### 2. Update User (Only an admin can update)

- **Endpoint:** PUT `/apps/:id`
- **Request Body:**
  ```json
  {
    "id":1
    "name": "John Doe",
    "icon": "john@example.com",
    "url": "http://google.com"
  },

    ### 3. Delete User (Only an admin can delete)

- **Endpoint:** DELETE `/apps/:id`

Database : - mysql