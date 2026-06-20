
// src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const stipendController = require('../controllers/stipendController');

router.get('/',
  authMiddleware,
  roleMiddleware(['FINANCE_OFFICER', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  stipendController.getAllPayments
);

router.get('/pending',
  authMiddleware,
  roleMiddleware(['FINANCE_OFFICER', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  stipendController.getPendingPayments
);

router.get('/paid',
  authMiddleware,
  roleMiddleware(['FINANCE_OFFICER', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  stipendController.getPaidPayments
);

module.exports = router;
