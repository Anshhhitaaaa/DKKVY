
// src/routes/auditRoutes.js
const express = require('express');
const router = express.Router();
const prisma = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const apiResponse = require('../utils/apiResponse');

router.get('/',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  async (req, res) => {
    try {
      const logs = await prisma.auditLog.findMany({
        include: { user: { select: { id: true, name: true, role: true } } },
        orderBy: { timestamp: 'desc' },
      });
      res.json(apiResponse(true, 'Audit logs retrieved', logs));
    } catch (error) {
      console.error('Get audit logs error:', error);
      res.status(500).json(apiResponse(false, 'Internal server error'));
    }
  }
);

module.exports = router;
