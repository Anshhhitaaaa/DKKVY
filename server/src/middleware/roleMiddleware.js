
// src/middleware/roleMiddleware.js
const apiResponse = require('../utils/apiResponse');

const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json(apiResponse(false, 'Access forbidden. Insufficient permissions.'));
    }
    next();
  };
};

module.exports = roleMiddleware;
