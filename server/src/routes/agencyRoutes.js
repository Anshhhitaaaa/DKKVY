
// src/routes/agencyRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const auditMiddleware = require('../middleware/auditMiddleware');
const agencyController = require('../controllers/agencyController');

router.post('/',
  authMiddleware,
  roleMiddleware(['AGENCY', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Agency', 'CREATE'),
  agencyController.createAgency
);

router.get('/',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  agencyController.getAgencies
);

router.get('/:id',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'AGENCY']),
  agencyController.getAgencyById
);

router.put('/:id/approve',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Agency', 'UPDATE'),
  agencyController.approveAgency
);

router.put('/:id/suspend',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Agency', 'UPDATE'),
  agencyController.suspendAgency
);

router.post('/:id/trainers',
  authMiddleware,
  roleMiddleware(['AGENCY', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Trainer', 'CREATE'),
  agencyController.createTrainer
);

module.exports = router;
