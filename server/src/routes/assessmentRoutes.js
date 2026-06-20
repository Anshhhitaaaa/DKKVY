
// src/routes/assessmentRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const auditMiddleware = require('../middleware/auditMiddleware');
const assessmentController = require('../controllers/assessmentController');

router.post('/',
  authMiddleware,
  roleMiddleware(['ASSESSMENT_OFFICER', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Assessment', 'CREATE'),
  assessmentController.createAssessment
);

router.get('/',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'FINANCE_OFFICER', 'ASSESSMENT_OFFICER']),
  assessmentController.getAssessments
);

router.get('/:applicantId',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'FINANCE_OFFICER', 'ASSESSMENT_OFFICER', 'APPLICANT']),
  assessmentController.getApplicantAssessment
);

router.put('/:id',
  authMiddleware,
  roleMiddleware(['ASSESSMENT_OFFICER', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Assessment', 'UPDATE'),
  assessmentController.updateAssessment
);

router.get('/eligible',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'ASSESSMENT_OFFICER']),
  assessmentController.getEligibleForCertificates
);

module.exports = router;
