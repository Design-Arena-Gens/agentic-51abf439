const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

const emailValidator = body('email').isEmail().withMessage('Valid email required');
const passwordValidator = body('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters');

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    emailValidator,
    passwordValidator,
    body('age').optional().isInt({ min: 12, max: 100 }),
    body('gender').optional().isString(),
  ],
  register
);

router.post('/login', [emailValidator, passwordValidator], login);

module.exports = router;

