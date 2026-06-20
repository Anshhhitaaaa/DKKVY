
// src/routes/certificateRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const auditMiddleware = require('../middleware/auditMiddleware');
const certificateController = require('../controllers/certificateController');

router.post('/generate',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Certificate', 'CREATE'),
  certificateController.generateCertificate
);

router.get('/',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  certificateController.getCertificates
);

router.get('/verify/:certNo',
  certificateController.verifyCertificate
);

router.get('/:id/download',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'APPLICANT']),
  certificateController.downloadCertificate
);

module.exports = router;
