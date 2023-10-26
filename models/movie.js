const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  rated: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  bookmarkedBy: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
});

module.exports = mongoose.model("Movie", movieSchema);
