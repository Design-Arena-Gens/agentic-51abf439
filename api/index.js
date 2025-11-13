const path = require('path');
const express = require('express');
const connectDB = require('../backend/src/config/db');
const apiApp = require('../backend/src/app');

const server = express();
const staticDir = path.join(__dirname, '../frontend/dist');

server.use(apiApp);
server.use(express.static(staticDir));

const sendIndex = (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'), (error) => {
    if (error) {
      console.error('Failed to serve index.html', error);
      if (!res.headersSent) {
        res.status(500).send('Internal Server Error');
      }
    }
  });
};

server.get('*', sendIndex);

let isDbConnected = false;

module.exports = async function handler(req, res) {
  if (!isDbConnected && process.env.MONGODB_URI) {
    await connectDB();
    isDbConnected = true;
  }

  return server(req, res);
};

module.exports.default = module.exports;
