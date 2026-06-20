
// src/controllers/applicantController.js
const prisma = require('../config/db');
const apiResponse = require('../utils/apiResponse');
const { generateApplicantId } = require('../utils/generateId');
const { encrypt, decrypt } = require('../utils/encryption');
const { body, validationResult } = require('express-validator');

const createApplicant = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(apiResponse(false, 'Validation error', errors.array()));
    }

    const {
      name, fatherMotherName, dob, gender, address, mobile, email,
      bankAccount, ifscCode, bankName, accountHolder, idProofType, idProofNumber, trainingSector
    } = req.body;

    // Generate unique applicant ID
    const applicantId = await generateApplicantId();

    // Create applicant
    const applicant = await prisma.applicant.create({
      data: {
        applicantId,
        userId: req.user.id,
        name,
        fatherMotherName,
        dob: new Date(dob),
        gender,
        address,
        mobile,
        email,
        bankAccount: req.encryptedData.bankAccount,
        ifscCode: encrypt(ifscCode),
        bankName,
        accountHolder,
        idProofType,
        idProofNumber: req.encryptedData.idProofNumber,
        trainingSector,
        applicationStatus: 'PENDING',
      },
    });

    // Create benefit record
    await prisma.benefit.create({
      data: {
        applicantId: applicant.id,
      },
    });

    res.status(201).json(apiResponse(true, 'Applicant created successfully', applicant));
  } catch (error) {
    console.error('Create applicant error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getApplicants = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, sector } = req.query;
    const skip = (page - 1) * limit;

    let where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { applicantId: { contains: search } },
        { mobile: { contains: search } },
      ];
    }
    if (status) where.applicationStatus = status;
    if (sector) where.trainingSector = sector;

    const [applicants, total] = await Promise.all([
      prisma.applicant.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, name: true } } },
      }),
      prisma.applicant.count({ where }),
    ]);

    // Decrypt sensitive data
    const decryptedApplicants = applicants.map(app => ({
      ...app,
      bankAccount: decrypt(app.bankAccount),
      ifscCode: decrypt(app.ifscCode),
      idProofNumber: decrypt(app.idProofNumber),
    }));

    res.json(apiResponse(true, 'Applicants retrieved successfully', decryptedApplicants, {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    }));
  } catch (error) {
    console.error('Get applicants error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getApplicantById = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await prisma.applicant.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        batchApplicants: { include: { batch: true } },
        attendances: true,
        assessments: true,
        payments: true,
        certificate: true,
        benefit: true,
        products: true,
        trainingHistories: true,
      },
    });

    if (!applicant) {
      return res.status(404).json(apiResponse(false, 'Applicant not found'));
    }

    const decryptedApplicant = {
      ...applicant,
      bankAccount: decrypt(applicant.bankAccount),
      ifscCode: decrypt(applicant.ifscCode),
      idProofNumber: decrypt(applicant.idProofNumber),
    };

    res.json(apiResponse(true, 'Applicant retrieved successfully', decryptedApplicant));
  } catch (error) {
    console.error('Get applicant by ID error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const updateApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Encrypt sensitive fields if they are being updated
    if (updateData.bankAccount) updateData.bankAccount = encrypt(updateData.bankAccount);
    if (updateData.ifscCode) updateData.ifscCode = encrypt(updateData.ifscCode);
    if (updateData.idProofNumber) updateData.idProofNumber = encrypt(updateData.idProofNumber);
    if (updateData.dob) updateData.dob = new Date(updateData.dob);

    const applicant = await prisma.applicant.update({
      where: { id },
      data: updateData,
    });

    res.json(apiResponse(true, 'Applicant updated successfully', applicant));
  } catch (error) {
    console.error('Update applicant error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getApplicantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await prisma.applicant.findUnique({
      where: { id },
      select: { applicantId: true, applicationStatus: true },
    });

    if (!applicant) {
      return res.status(404).json(apiResponse(false, 'Applicant not found'));
    }

    res.json(apiResponse(true, 'Applicant status retrieved successfully', applicant));
  } catch (error) {
    console.error('Get applicant status error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getApplicantHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const trainingHistories = await prisma.trainingHistory.findMany({
      where: { applicantId: id },
      orderBy: { completedAt: 'desc' },
    });

    res.json(apiResponse(true, 'Training history retrieved successfully', trainingHistories));
  } catch (error) {
    console.error('Get applicant history error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

module.exports = {
  createApplicant,
  getApplicants,
  getApplicantById,
  updateApplicant,
  getApplicantStatus,
  getApplicantHistory,
};
