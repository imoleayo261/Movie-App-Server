//how to connect to database

require("dotenv").config();

const mongoose = require("mongoose");
const movie = require("./models/movie");
const moviesJson = require('./movies.json')

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
    console.log("Deleting...");
    await movie.deleteMany()
    console.log("Previous ones deleted");
    console.log("Uploading...")
    await movie.create(moviesJson);

    console.log("Movie Uploaded SUccessfully");
    process.exit(0)
  } catch (error) {
    console.log(error);
    console.log("unable to connect");
    process.exit(1)
  }
};

start();
