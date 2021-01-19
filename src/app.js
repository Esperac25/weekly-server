require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const itemsRouter = require('./items/items-router');

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

const app = express();
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());


app.use('/api/items', itemsRouter);

app.get("/", (req, res) => {
    res.send("Hello this is the weekly api!");
  });

  // app.use((error, req, res, next) => {
  //   console.error(error); 
  //   res.status(500).json({
  //     error: {message: "Internal server error"}
  //   })
  // });

module.exports = app;