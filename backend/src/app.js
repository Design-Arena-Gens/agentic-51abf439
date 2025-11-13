const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const statRoutes = require('./routes/statRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const remedyRoutes = require('./routes/remedyRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',') : '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/foods', recommendationRoutes);
app.use('/api/remedies', remedyRoutes);
app.use('/api/chat', chatRoutes);

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'Not found' });
  }
  return next();
});

module.exports = app;
