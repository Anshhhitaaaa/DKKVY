
// src/controllers/batchController.js
const prisma = require('../config/db');
const apiResponse = require('../utils/apiResponse');
const { generateBatchCode } = require('../utils/generateId');

const createBatch = async (req, res) => {
  try {
    const { agencyId, trainerId, sector, startDate, endDate, totalSeats, venue } = req.body;
    const batchCode = await generateBatchCode(sector);

    const batch = await prisma.batch.create({
      data: {
        batchCode,
        agencyId,
        trainerId,
        sector,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalSeats: parseInt(totalSeats),
        venue,
        status: 'UPCOMING',
      },
    });

    res.status(201).json(apiResponse(true, 'Batch created successfully', batch));
  } catch (error) {
    console.error('Create batch error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getBatches = async (req, res) => {
  try {
    const { status, sector, agencyId } = req.query;
    let where = {};
    if (status) where.status = status;
    if (sector) where.sector = sector;
    if (agencyId) where.agencyId = agencyId;

    const batches = await prisma.batch.findMany({
      where,
      include: {
        agency: true,
        trainer: true,
        batchApplicants: { include: { applicant: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(apiResponse(true, 'Batches retrieved successfully', batches));
  } catch (error) {
    console.error('Get batches error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await prisma.batch.findUnique({
      where: { id },
      include: {
        agency: true,
        trainer: true,
        batchApplicants: { include: { applicant: true } },
        attendances: true,
        assessments: true,
        trainingPhotos: true,
      },
    });

    if (!batch) {
      return res.status(404).json(apiResponse(false, 'Batch not found'));
    }

    res.json(apiResponse(true, 'Batch retrieved successfully', batch));
  } catch (error) {
    console.error('Get batch by ID error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const approveBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await prisma.batch.update({
      where: { id },
      data: { status: 'RUNNING' },
    });

    res.json(apiResponse(true, 'Batch approved and started successfully', batch));
  } catch (error) {
    console.error('Approve batch error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const enrollApplicantToBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicantId } = req.body;

    // Check training history
    const existingHistory = await prisma.trainingHistory.findFirst({
      where: {
        applicantId,
        sector: (await prisma.batch.findUnique({ where: { id } }))?.sector,
        status: 'COMPLETED',
      },
    });
    if (existingHistory) {
      return res.status(409).json(apiResponse(false, 'Applicant has already completed training in this sector'));
    }

    const batchApplicant = await prisma.batchApplicant.create({
      data: {
        batchId: id,
        applicantId,
      },
    });

    res.status(201).json(apiResponse(true, 'Applicant enrolled to batch successfully', batchApplicant));
  } catch (error) {
    console.error('Enroll applicant to batch error:', error);
    if (error.code === 'P2002') {
      return res.status(409).json(apiResponse(false, 'Applicant is already enrolled in this batch'));
    }
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const uploadTrainingPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;
    const photoUrl = req.file?.path; // From Cloudinary storage

    const trainingPhoto = await prisma.trainingPhoto.create({
      data: {
        batchId: id,
        photoUrl,
        caption,
        uploadedBy: req.user.id,
      },
    });

    res.status(201).json(apiResponse(true, 'Training photo uploaded successfully', trainingPhoto));
  } catch (error) {
    console.error('Upload training photo error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

module.exports = {
  createBatch,
  getBatches,
  getBatchById,
  approveBatch,
  enrollApplicantToBatch,
  uploadTrainingPhoto,
};
