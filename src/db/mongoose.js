const mongoose = require('mongoose');

async function connectDB() {
  const uri =
    process.env.MONGO_URI ||
    (process.env.CONNECTION_STRING &&
      process.env.CONNECTION_STRING.replace(
        '${PASSWORD_CONNECTION_STRING}',
        process.env.PASSWORD_CONNECTION_STRING || ''
      ));

  if (!uri) throw new Error('MONGO_URI is not set in .env');

  const dbName = process.env.MONGO_DB_NAME;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ...(dbName ? { dbName } : {})
  });
}

module.exports = { connectDB, mongoose };
