
// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

router.post('/register', [
  body('name').notEmpty(),
  body('mobile').isMobilePhone(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['SUPER_ADMIN', 'DKVIB_ADMIN', 'FINANCE_OFFICER', 'ASSESSMENT_OFFICER', 'AGENCY', 'APPLICANT']),
], authController.register);

router.post('/verify-otp', authController.verifyOtp);

router.post('/login', authController.login);

router.post('/refresh-token', authController.refreshToken);

router.post('/forgot-password', authController.forgotPassword);

router.post('/reset-password', authController.resetPassword);
router.post('/test-user', authController.createTestUser);

module.exports = router;
