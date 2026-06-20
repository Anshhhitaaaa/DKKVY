
// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const apiResponse = require('../utils/apiResponse');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json(apiResponse(false, 'Access denied. No token provided.'));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json(apiResponse(false, 'Invalid token.'));
  }
};

module.exports = authMiddleware;
