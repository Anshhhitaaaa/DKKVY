
// src/controllers/agencyController.js
const prisma = require('../config/db');
const apiResponse = require('../utils/apiResponse');

const createAgency = async (req, res) => {
  try {
    const {
      agencyName, registrationNo, address, contactPerson, mobile, email,
      infrastructure, experience, sectors, documents
    } = req.body;

    const agency = await prisma.agency.create({
      data: {
        userId: req.user.id,
        agencyName,
        registrationNo,
        address,
        contactPerson,
        mobile,
        email,
        infrastructure,
        experience: parseInt(experience),
        sectors,
        documents,
        approvalStatus: 'PENDING',
      },
    });

    res.status(201).json(apiResponse(true, 'Agency created successfully', agency));
  } catch (error) {
    console.error('Create agency error:', error);
    if (error.code === 'P2002') {
      return res.status(409).json(apiResponse(false, 'Agency with this registration number already exists'));
    }
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getAgencies = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { approvalStatus: status } : {};

    const agencies = await prisma.agency.findMany({
      where,
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });

    res.json(apiResponse(true, 'Agencies retrieved successfully', agencies));
  } catch (error) {
    console.error('Get agencies error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getAgencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const agency = await prisma.agency.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        trainers: true,
        batches: true,
      },
    });

    if (!agency) {
      return res.status(404).json(apiResponse(false, 'Agency not found'));
    }

    res.json(apiResponse(true, 'Agency retrieved successfully', agency));
  } catch (error) {
    console.error('Get agency by ID error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const approveAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const agency = await prisma.agency.update({
      where: { id },
      data: {
        approvalStatus: 'APPROVED',
        approvedAt: new Date(),
        approvedBy: req.user.id,
      },
    });

    res.json(apiResponse(true, 'Agency approved successfully', agency));
  } catch (error) {
    console.error('Approve agency error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const suspendAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const agency = await prisma.agency.update({
      where: { id },
      data: { approvalStatus: 'SUSPENDED' },
    });

    res.json(apiResponse(true, 'Agency suspended successfully', agency));
  } catch (error) {
    console.error('Suspend agency error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const createTrainer = async (req, res) => {
  try {
    const { agencyId } = req.params;
    const { name, mobile, sector, experience } = req.body;

    const trainer = await prisma.trainer.create({
      data: {
        agencyId,
        name,
        mobile,
        sector,
        experience: parseInt(experience),
      },
    });

    res.status(201).json(apiResponse(true, 'Trainer created successfully', trainer));
  } catch (error) {
    console.error('Create trainer error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

module.exports = {
  createAgency,
  getAgencies,
  getAgencyById,
  approveAgency,
  suspendAgency,
  createTrainer,
};
