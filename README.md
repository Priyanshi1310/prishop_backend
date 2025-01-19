# Getting started with node project ecommerce website - Prishop_backend

## Intoduction
This project involves building the backend for a comprehensive Ecommerce application. It is designed using Node.js, Express.js, and MongoDB to handle product management, user interactions, and order product functionalities for an Ecommerce platform.

Key features include retrieving products by category, adding products to the cart and order product, and displaying them on the frontend. The project also includes robust API documentation using Swagger, input validation, logging, and error handling for smooth operation and clear user experience.

This backend service interacts with the frontend Ecommerce website, allowing users to browse products, manage their orders.

## Feature
1. **Products -** 
- Add Products - User can add product to website
- Search Products - user can search product through product id
- Update and Delete - User can update or delete product
2. **Users -**
- Login/Register - User can login or register account to website
- Search User - User can be search userId
- Update and Delete - User can update his/her details and it can be delete as well
3. **Orders -**
- Add Orders - user can add orders
- Get Orders - User can retrieve all Orders or by order id
- Update and Delete - User can update or delete order
- Order Details - User can get order details (like total sales, user's order, order count)

## Objective
- **Build a scalable backend** using Node.js, Express.js, and MongoDB to manage products, categories, cart, and favorites.
- **Create RESTful APIs** to handle product retrieval, cart and favorites management.
- **Ensure smooth user experience** by storing and retrieving cart/favorites data efficiently.
- **Maintain code quality** with validation, logging, and comprehensive Swagger API documentation.

## Getting Started
To run the application locally, follow these steps:
1. Clone the repository
   ### `git clone https://github.com/Priyanshi1310/prishop_backend.git`
2. Navigate to the project directory:
   ### `cd prishop`
3. Install dependencies:
   ### `npm install`
4. Start the development server:
   ### `npm start`

The application will be accessible at http://localhost:3000 in your web browser

## API Routes
The Project consists of the following API routes -

1. For User Management -
- `GET http://localhost:3000/api/v1/users`
- `POST http://localhost:3000/api/v1/users/register`
- `POST http://localhost:3000/api/v1/users/login`

2. For Product Management -
- `GET http://localhost:3000/api/v1/products`
- `POST http://localhost:3000/api/v1/products`
- `PUT http://localhost:3000/api/v1/products/{id}`
- `DELETE http://localhost:3000/api/v1/products/{id}`

3.For Order Managment - 
- `GET http://localhost:3000/api/v1/orders`
- `POST http://localhost:3000/api/v1/orders`
- `PUT http://localhost:3000/api/v1/orders/{id}`
- `DELETE http://localhost:3000/api/v1/orders/{id}`

4.For Categories Management -
- `GET http://localhost:3000/api/v1/categories`
- `POST http://localhost:3000/api/v1/categories`
- `PUT http://localhost:3000/api/v1/categories/{id}`
- `DELETE http://localhost:3000/api/v1/categories/{id}`

## Running Tests -
To run the test cases, follow the steps below:
1. Change the directory to the test folder:
### `cd tests`
Run the following command to execute the tests using Mocha:
### `npm test`

## Dependencies
The project utilizes the following technologies:
- Node.js: A JavaScript runtime environment.
- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database used for storing subscriber data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- EJS: A view engine for Node.js
- Chai: A BDD/TDD assertion library for Node.js.
- Chai-HTTP: A plugin for Chai that provides HTTP integration testing capabilities.
- Mocha: A JavaScript testing framework.
- Nodemon: A utility that automatically restarts the server when changes are detected.
- Swagger: API documentation and testing framework.


