const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.post('/', movieController.createMovie);
router.get('/', movieController.listMovies);
router.get('/:id', movieController.getMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.removeMovie);

module.exports = router;
