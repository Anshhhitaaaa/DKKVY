
// src/routes/benefitRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const auditMiddleware = require('../middleware/auditMiddleware');
const benefitController = require('../controllers/benefitController');

router.post('/',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Benefit', 'CREATE'),
  benefitController.createBenefit
);

router.put('/:applicantId',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Benefit', 'UPDATE'),
  benefitController.updateBenefit
);

router.get('/',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  benefitController.getAllBenefits
);

router.get('/:applicantId',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'APPLICANT']),
  benefitController.getApplicantBenefit
);

module.exports = router;
