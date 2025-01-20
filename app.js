const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Swagger

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PriShop Backend",
      version: "1.1.0",
      description:
        "This is a simple ecommerce API application made with Nodejs & Expressjs and documented with Swagger",
      contact: {
        name: "Priyanshi Gupta",
      },
    },
    servers: [
      // {
      //   url: "http://localhost:3000/api/v1",
      // },
      {
        url: "http://",
        description: "HTTP connection",
      },
      {
        url: "https://",
        description: "HTTPS connection",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get('/',(req,res) => {
  res.json({message: "Hello Word from backend"});
})

// app.listen(3000, ()=>{

//     console.log('server is running http://localhost:3000');
// })
// Export app
module.exports = app;
