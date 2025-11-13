const express = require('express');
const { getRemedies, getRemedyOfTheDay } = require('../controllers/remedyController');

const router = express.Router();

router.get('/', getRemedies);
router.get('/today', getRemedyOfTheDay);

module.exports = router;

