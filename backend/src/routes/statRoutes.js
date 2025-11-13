const express = require('express');
const { body } = require('express-validator');
const { getStats, addStat } = require('../controllers/statController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', getStats);

router.post(
  '/',
  [
    body('waterMl').optional().isFloat({ min: 0, max: 6000 }),
    body('calories').optional().isFloat({ min: 0, max: 6000 }),
    body('sleepHours').optional().isFloat({ min: 0, max: 16 }),
    body('weightKg').optional().isFloat({ min: 20, max: 250 }),
    body('mood').optional().isString(),
  ],
  addStat
);

module.exports = router;

