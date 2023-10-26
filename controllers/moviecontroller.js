const Movie = require("../models/movie");

const allData = async (req, res) => {
  //get all Movies = from the db and send it as the json response
  const movies = await Movie.find({});
  res.status(200).json({
    data: movies,
  });
};
const allMovies = async (req, res) => {
  const movies = await Movie.find({ type: "movie" });
  res.status(200).json({
    data: movies,
  });
};
const allSeries = async (req, res) => {
  const series = await Movie.find({ type: "series" });
  res.status(200).json({
    data: series,
  });
};

module.exports = { allData, allSeries, allMovies };
