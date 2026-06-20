
// src/routes/applicantRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const auditMiddleware = require('../middleware/auditMiddleware');
const duplicateCheck = require('../middleware/duplicateCheck');
const applicantController = require('../controllers/applicantController');

router.post('/',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'APPLICANT']),
  duplicateCheck,
  [
    body('name').notEmpty(),
    body('fatherMotherName').notEmpty(),
    body('dob').isISO8601(),
    body('gender').isIn(['MALE', 'FEMALE', 'OTHER']),
    body('address').notEmpty(),
    body('mobile').isMobilePhone(),
    body('bankAccount').notEmpty(),
    body('ifscCode').notEmpty(),
    body('bankName').notEmpty(),
    body('accountHolder').notEmpty(),
    body('idProofType').isIn(['AADHAAR', 'PAN', 'VOTER_ID', 'PASSPORT', 'DRIVING_LICENSE']),
    body('idProofNumber').notEmpty(),
    body('trainingSector').notEmpty(),
  ],
  auditMiddleware('Applicant', 'CREATE'),
  applicantController.createApplicant
);

router.get('/',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'FINANCE_OFFICER', 'ASSESSMENT_OFFICER']),
  applicantController.getApplicants
);

router.get('/:id',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'FINANCE_OFFICER', 'ASSESSMENT_OFFICER', 'APPLICANT']),
  applicantController.getApplicantById
);

router.put('/:id',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Applicant', 'UPDATE'),
  applicantController.updateApplicant
);

router.get('/:id/status',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'APPLICANT']),
  applicantController.getApplicantStatus
);

router.get('/:id/history',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'APPLICANT']),
  applicantController.getApplicantHistory
);

module.exports = router;
