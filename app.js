const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const blog = require("./routes/blog");
require("dotenv").config();
const app = express();

require("./passport.js");

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  console.log("got here");
});

// Blog route
app.use("/blog", blog);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to DB & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
