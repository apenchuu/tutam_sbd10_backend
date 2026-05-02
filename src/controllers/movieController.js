const movieService = require('../services/movieService');

async function createMovie(req, res, next) {
  try {
    const payload = { ...req.body };
    if (payload.rating !== undefined) {
      const r = Number(payload.rating);
      if (!Number.isNaN(r)) payload.rating = Math.min(5, Math.max(0, Math.ceil(r / 2)));
    }
    const created = await movieService.createMovie(payload);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

async function listMovies(req, res, next) {
  try {
    const filter = {};

    if (req.query.judul_movie) filter.judul_movie = { $regex: req.query.judul_movie, $options: 'i' };
    
    if (req.query.penulis_review) filter.penulis_review = { $regex: req.query.penulis_review, $options: 'i' };

    if (req.query.stars) {
      const s = Number(String(req.query.stars).trim());
      if (!Number.isNaN(s) && s >= 0 && s <= 5) filter.rating = s;
    } else if (req.query.rating) {
      const r = Number(String(req.query.rating).trim());
      if (!Number.isNaN(r)) filter.rating = Math.min(5, Math.max(0, Math.ceil(r / 2)));
    }
    
    const movies = await movieService.getAllMovies(filter);
    res.json(movies);
  } catch (err) {
    next(err);
  }
}

async function getMovie(req, res, next) {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    next(err);
  }
}

async function updateMovie(req, res, next) {
  try {
    const payload = { ...req.body };
    if (payload.rating !== undefined) {
      const r = Number(payload.rating);
      if (!Number.isNaN(r)) payload.rating = Math.min(5, Math.max(0, Math.ceil(r / 2)));
    }
    const updated = await movieService.updateMovie(req.params.id, payload);
    if (!updated) return res.status(404).json({ message: 'Movie not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function removeMovie(req, res, next) {
  try {
    const removed = await movieService.deleteMovie(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Deleted', id: req.params.id });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createMovie,
  listMovies,
  getMovie,
  updateMovie,
  removeMovie
};
