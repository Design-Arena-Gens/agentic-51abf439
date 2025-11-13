const jwt = require('jsonwebtoken');
const User = require('../models/User');

const optionalAuth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next();
  }

  try {
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    if (!decoded?.id) return next();
    const user = await User.findById(decoded.id);
    if (user) {
      req.user = user;
    }
    return next();
  } catch (error) {
    return next();
  }
};

module.exports = optionalAuth;

