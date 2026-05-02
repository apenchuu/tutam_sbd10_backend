const { Schema, model } = require('mongoose');

const MovieSchema = new Schema({
  judul_movie: { type: String, required: true },
  deskripsi_review: { type: String },
  penulis_review: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  image_movie: { type: String },
  genre_movie: { type: [String], default: [] },
  kategori: { type: String, enum: ['anime', 'dracin', 'drakor', 'movies', 'other'], default: 'other' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Movie', MovieSchema);