
// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const apiResponse = require('../utils/apiResponse');
const { sendOTP, verifyOTP } = require('../services/otpService');
const { body, validationResult } = require('express-validator');

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(apiResponse(false, 'Validation error', errors.array()));
    }

    const { name, mobile, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { mobile },
          { email: email || undefined },
        ],
      },
    });

    if (existingUser) {
      return res.status(409).json(apiResponse(false, 'User with this mobile or email already exists'));
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        mobile,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Send OTP for verification
    await sendOTP(mobile, 'REGISTRATION');

    res.status(201).json(apiResponse(true, 'User registered successfully. OTP sent.', { userId: user.id }));
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const result = await verifyOTP(mobile, otp, 'REGISTRATION');
    if (!result.success) {
      return res.status(400).json(apiResponse(false, result.message));
    }
    res.json(apiResponse(true, result.message));
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const login = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await prisma.user.findUnique({ where: { mobile } });
    if (!user) {
      return res.status(400).json(apiResponse(false, 'Invalid credentials'));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(apiResponse(false, 'Invalid credentials'));
    }
    if (user.status !== 'ACTIVE') {
      return res.status(403).json(apiResponse(false, 'Account is inactive'));
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    res.json(apiResponse(true, 'Login successful', {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      }
    }));
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json(apiResponse(false, 'Refresh token is required'));
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json(apiResponse(false, 'Invalid refresh token'));
    }

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json(apiResponse(true, 'Token refreshed successfully', { accessToken: newAccessToken }));
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { mobile } = req.body;
    const user = await prisma.user.findUnique({ where: { mobile } });
    if (!user) {
      return res.status(404).json(apiResponse(false, 'User not found'));
    }
    await sendOTP(mobile, 'FORGOT_PASSWORD');
    res.json(apiResponse(true, 'OTP sent for password reset'));
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const resetPassword = async (req, res) => {
  try {
    const { mobile, otp, newPassword } = req.body;
    const otpResult = await verifyOTP(mobile, otp, 'FORGOT_PASSWORD');
    if (!otpResult.success) {
      return res.status(400).json(apiResponse(false, otpResult.message));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { mobile },
      data: { password: hashedPassword },
    });

    res.json(apiResponse(true, 'Password reset successfully'));
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const createTestUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('test123', 12);
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        mobile: '9876543210',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'DKVIB_ADMIN',
        status: 'ACTIVE'
      }
    });
    res.json(apiResponse(true, 'Test user created successfully!', { 
      mobile: '9876543210', 
      password: 'test123',
      user: testUser 
    }));
  } catch (error) {
    console.error('Create test user error:', error);
    res.status(500).json(apiResponse(false, 'Failed to create test user', error.message));
  }
};

module.exports = {
  register,
  verifyOtp,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  createTestUser,
};
