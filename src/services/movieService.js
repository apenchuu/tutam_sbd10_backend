const Movie = require('../models/movieModel');

async function createMovie(data) {
  const movie = new Movie(data);
  return movie.save();
}

async function getAllMovies(filter = {}) {
  return Movie.find(filter).sort({ createdAt: -1 }).exec();
}

async function getMovieById(id) {
  return Movie.findById(id).exec();
}

async function updateMovie(id, data) {
  return Movie.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
}

async function deleteMovie(id) {
  return Movie.findByIdAndDelete(id).exec();
}

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie
};
