
// src/middleware/auditMiddleware.js
const prisma = require('../config/db');

const auditMiddleware = (moduleName, action) => {
  return async (req, res, next) => {
    const originalSend = res.send;
    res.send = async function (data) {
      if (res.statusCode < 400 && req.user) {
        try {
          await prisma.auditLog.create({
            data: {
              userId: req.user.id,
              action,
              module: moduleName,
              description: `Performed ${action} on ${moduleName}`,
              ipAddress: req.ip,
              userAgent: req.get('user-agent'),
            },
          });
        } catch (error) {
          console.error('Audit log error:', error);
        }
      }
      originalSend.call(this, data);
    };
    next();
  };
};

module.exports = auditMiddleware;
