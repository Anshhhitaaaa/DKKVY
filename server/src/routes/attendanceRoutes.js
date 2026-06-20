
// src/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const auditMiddleware = require('../middleware/auditMiddleware');
const attendanceController = require('../controllers/attendanceController');

router.post('/send-otp',
  authMiddleware,
  roleMiddleware(['AGENCY', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  attendanceController.sendAttendanceOTP
);

router.post('/mark',
  authMiddleware,
  roleMiddleware(['AGENCY', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Attendance', 'CREATE'),
  attendanceController.markAttendance
);

router.post('/bulk',
  authMiddleware,
  roleMiddleware(['AGENCY', 'SUPER_ADMIN', 'DKVIB_ADMIN']),
  auditMiddleware('Attendance', 'CREATE'),
  attendanceController.bulkMarkAttendance
);

router.get('/:batchId',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'FINANCE_OFFICER', 'ASSESSMENT_OFFICER', 'AGENCY']),
  attendanceController.getAttendanceByBatch
);

router.get('/:batchId/:applicantId',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'FINANCE_OFFICER', 'ASSESSMENT_OFFICER', 'AGENCY', 'APPLICANT']),
  attendanceController.getApplicantAttendance
);

router.get('/percentage/:applicantId',
  authMiddleware,
  roleMiddleware(['SUPER_ADMIN', 'DKVIB_ADMIN', 'FINANCE_OFFICER', 'ASSESSMENT_OFFICER', 'AGENCY', 'APPLICANT']),
  attendanceController.getAttendancePercentage
);

module.exports = router;
