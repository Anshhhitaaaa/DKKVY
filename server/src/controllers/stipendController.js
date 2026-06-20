
// src/controllers/stipendController.js
const prisma = require('../config/db');
const apiResponse = require('../utils/apiResponse');
const crypto = require('crypto');

const getEligibleForStipend = async (req, res) => {
  try {
    // Eligible: 100% attendance (12 days), passed assessment, no existing payment
    const eligibleApplicants = await prisma.applicant.findMany({
      where: {
        payments: { none: {} },
        attendances: { every: { present: true } },
        assessments: { some: { passFail: true } },
      },
      include: { attendances: true, assessments: true },
    });

    const filtered = eligibleApplicants.filter(app => app.attendances.length === 12);

    res.json(apiResponse(true, 'Eligible applicants for stipend retrieved', filtered));
  } catch (error) {
    console.error('Get eligible for stipend error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const processStipend = async (req, res) => {
  try {
    const { applicantId, utrNumber } = req.body;
    const transactionId = crypto.randomUUID();

    const payment = await prisma.payment.create({
      data: {
        applicantId,
        amount: 1600,
        paymentType: 'TOTAL',
        transactionId,
        utrNumber,
        status: 'PROCESSING',
        processedBy: req.user.id,
      },
    });

    res.status(201).json(apiResponse(true, 'Stipend processing initiated', payment));
  } catch (error) {
    console.error('Process stipend error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const bulkProcessStipend = async (req, res) => {
  try {
    const { applicantIds } = req.body;
    const payments = [];

    for (const applicantId of applicantIds) {
      const transactionId = crypto.randomUUID();
      const payment = await prisma.payment.create({
        data: {
          applicantId,
          amount: 1600,
          paymentType: 'TOTAL',
          transactionId,
          status: 'PROCESSING',
          processedBy: req.user.id,
        },
      });
      payments.push(payment);
    }

    res.status(201).json(apiResponse(true, 'Bulk stipend processing initiated', payments));
  } catch (error) {
    console.error('Bulk process stipend error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getApplicantPayments = async (req, res) => {
  try {
    const { applicantId } = req.params;
    const payments = await prisma.payment.findMany({
      where: { applicantId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(apiResponse(true, 'Applicant payments retrieved', payments));
  } catch (error) {
    console.error('Get applicant payments error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getAllPayments = async (req, res) => {
  try {
    const { status } = req.query;
    let where = status ? { status } : {};
    const payments = await prisma.payment.findMany({
      where,
      include: { applicant: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(apiResponse(true, 'All payments retrieved', payments));
  } catch (error) {
    console.error('Get all payments error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getPendingPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { status: 'PENDING' },
      include: { applicant: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(apiResponse(true, 'Pending payments retrieved', payments));
  } catch (error) {
    console.error('Get pending payments error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getPaidPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { status: 'PAID' },
      include: { applicant: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(apiResponse(true, 'Paid payments retrieved', payments));
  } catch (error) {
    console.error('Get paid payments error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

module.exports = {
  getEligibleForStipend,
  processStipend,
  bulkProcessStipend,
  getApplicantPayments,
  getAllPayments,
  getPendingPayments,
  getPaidPayments,
};
