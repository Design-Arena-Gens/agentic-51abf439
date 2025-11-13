const mongoose = require('mongoose');

let connectionPromise;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    mongoose.set('strictQuery', false);
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (!connectionPromise) {
      connectionPromise = mongoose.connect(uri, {
        dbName: process.env.MONGODB_DB || undefined,
      });
    }

    await connectionPromise;
    console.log('MongoDB connected');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

module.exports = connectDB;
