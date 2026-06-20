
// src/routes/batchRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const auditMiddleware = require('../middleware/auditMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const batchController = require('../controllers/batchController');

router.post('/',
  authMiddleware,
  roleMiddleware(['AGENCY', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Batch', 'CREATE'),
  batchController.createBatch
);

router.get('/',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'FINANCE_OFFICER', 'ASSESSMENT_OFFICER', 'AGENCY']),
  batchController.getBatches
);

router.get('/:id',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'FINANCE_OFFICER', 'ASSESSMENT_OFFICER', 'AGENCY']),
  batchController.getBatchById
);

router.put('/:id/approve',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Batch', 'UPDATE'),
  batchController.approveBatch
);

router.post('/:id/applicants',
  authMiddleware,
  roleMiddleware(['AGENCY', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('BatchApplicant', 'CREATE'),
  batchController.enrollApplicantToBatch
);

router.post('/:id/photos',
  authMiddleware,
  roleMiddleware(['AGENCY', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  uploadMiddleware.single('photo'),
  auditMiddleware('TrainingPhoto', 'CREATE'),
  batchController.uploadTrainingPhoto
);

module.exports = router;
