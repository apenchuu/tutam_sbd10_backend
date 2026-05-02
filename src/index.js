require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./db/mongoose');

const movieRoutes = require('./routes/movieRoutes');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/movies', movieRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect DB', err);
    process.exit(1);
  });
