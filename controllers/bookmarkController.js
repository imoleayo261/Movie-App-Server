const Movie = require("../models/movie");
const customError = require("../utils/customError");

const allBookmarks = async (req, res) => {
  const { userId } = req.user;
  const bookmarks = await Movie.find({ bookmarkedBy: userId });
  res.status(200).json({
    data: bookmarks,
  });
};

const addBookmark = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;

  const movie = await Movie.findOneAndUpdate(
    { _id: id },
    { $push: { bookmarkedBy: userId } }
  );

  if (!movie) {
    return next(customError(`No Movie with ID:${id}`, 400));
  }
  res.status(200).json({
    message: "Movie Bookmark!",
  });
};

const removeBookmark = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;

  //============================
  const hasBeenBookmarked = await Movie.findOne({
    _id: id,
    bookmarkedBy: userId,
  });


  if (!hasBeenBookmarked) {
    return next(customError(`No Movie with Id:${id}`), 400);
  }

  const movie = await Movie.findOneAndUpdate(
    { _id: id },
    { $pull: { bookmarkedBy: userId } }
  );

  if (!movie) {
    return next(customError(`No Movie with ID:${id}`, 400));
  }
  res.status(200).json({
    message: "Remove Bookmark",
  });
};

module.exports = { allBookmarks, addBookmark, removeBookmark };
