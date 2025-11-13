const express = require('express');
const { getRecommendations } = require('../controllers/recommendationController');
const optionalAuth = require('../middleware/optionalAuth');

const router = express.Router();

router.get('/', optionalAuth, (req, res) => {
  const diseases =
    req.query.diseases ||
    (req.user?.profile?.diseases && JSON.stringify(req.user.profile.diseases));
  const activityLevel = req.query.activityLevel || req.user?.profile?.activityLevel;

  req.query = {
    ...req.query,
    diseases,
    activityLevel,
  };

  getRecommendations(req, res);
});

module.exports = router;
