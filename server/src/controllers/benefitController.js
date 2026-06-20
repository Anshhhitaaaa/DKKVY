
// src/controllers/benefitController.js
const prisma = require('../config/db');
const apiResponse = require('../utils/apiResponse');

const createBenefit = async (req, res) => {
  try {
    const { applicantId } = req.body;
    const benefit = await prisma.benefit.create({
      data: { applicantId },
    });
    res.status(201).json(apiResponse(true, 'Benefit record created', benefit));
  } catch (error) {
    console.error('Create benefit error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const updateBenefit = async (req, res) => {
  try {
    const { applicantId } = req.params;
    const updateData = {};
    const now = new Date();

    if (req.body.certificateIssued !== undefined) {
      updateData.certificateIssued = req.body.certificateIssued;
      if (req.body.certificateIssued) updateData.certificateDate = now;
    }
    if (req.body.identityCardIssued !== undefined) {
      updateData.identityCardIssued = req.body.identityCardIssued;
      if (req.body.identityCardIssued) updateData.identityCardDate = now;
    }
    if (req.body.sewingMachineIssued !== undefined) {
      updateData.sewingMachineIssued = req.body.sewingMachineIssued;
      if (req.body.sewingMachineIssued) {
        updateData.sewingMachineDate = now;
        updateData.machineSerialNo = req.body.machineSerialNo;
      }
    }

    const benefit = await prisma.benefit.update({
      where: { applicantId },
      data: updateData,
    });

    res.json(apiResponse(true, 'Benefit updated successfully', benefit));
  } catch (error) {
    console.error('Update benefit error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getAllBenefits = async (req, res) => {
  try {
    const benefits = await prisma.benefit.findMany({
      include: { applicant: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(apiResponse(true, 'Benefits retrieved successfully', benefits));
  } catch (error) {
    console.error('Get all benefits error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getApplicantBenefit = async (req, res) => {
  try {
    const { applicantId } = req.params;
    const benefit = await prisma.benefit.findUnique({
      where: { applicantId },
      include: { applicant: true },
    });
    if (!benefit) {
      return res.status(404).json(apiResponse(false, 'Benefit record not found'));
    }
    res.json(apiResponse(true, 'Applicant benefit retrieved', benefit));
  } catch (error) {
    console.error('Get applicant benefit error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

module.exports = {
  createBenefit,
  updateBenefit,
  getAllBenefits,
  getApplicantBenefit,
};
