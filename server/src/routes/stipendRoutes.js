
// src/routes/stipendRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const auditMiddleware = require('../middleware/auditMiddleware');
const stipendController = require('../controllers/stipendController');

router.get('/eligible',
  authMiddleware,
  roleMiddleware(['FINANCE_OFFICER', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  stipendController.getEligibleForStipend
);

router.post('/process',
  authMiddleware,
  roleMiddleware(['FINANCE_OFFICER', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Payment', 'CREATE'),
  stipendController.processStipend
);

router.post('/bulk',
  authMiddleware,
  roleMiddleware(['FINANCE_OFFICER', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Payment', 'CREATE'),
  stipendController.bulkProcessStipend
);

router.get('/:applicantId',
  authMiddleware,
  roleMiddleware(['FINANCE_OFFICER', 'SUPER_ADMIN', 'DKVIB_ADMIN', 'APPLICANT']),
  stipendController.getApplicantPayments
);

module.exports = router;
