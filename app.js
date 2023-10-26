//require the dotenv package and configures it immediately
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//spins up a new express application
const app = express();

//uses port from the env file or defaults to 3000
const port = process.env.PORT || 3000;

const authRouter = require("./routes/authRouter");
const movieRouter = require("./routes/movieRouter");
const bookmarkRouter = require("./routes/bookmarkRouter");
const error = require("./middlewares/error");

//allows request from the client side to go through

app.use(
  cors({
    origin: ["process.env.CLIENT_URL", "http://localhost:5174"],
  })
);

//allow access to the req.body on all request (req.body would be undefined without this)
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/movie", movieRouter);
app.use("/api/bookmark", bookmarkRouter);
app.use(error);

//starts listening on a given port and runs the callback function when it does

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connented");
    app.listen(port, () => {
      console.log(`server is Listening on PORT:${port}`);
    });
  } catch (err) {
    console.log(err);
    console.log("Unable to Connet");
  }
};

start();
