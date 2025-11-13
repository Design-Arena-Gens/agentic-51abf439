const express = require('express');
const { body } = require('express-validator');
const { getMe, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/me', getMe);

router.put(
  '/profile',
  [
    body('heightCm').optional().isFloat({ min: 120, max: 220 }),
    body('weightKg').optional().isFloat({ min: 30, max: 200 }),
    body('activityLevel')
      .optional()
      .isIn(['sedentary', 'light', 'moderate', 'active', 'very-active']),
    body('diseases').optional().isArray(),
  ],
  updateProfile
);

module.exports = router;

