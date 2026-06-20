
// src/controllers/assessmentController.js
const prisma = require('../config/db');
const apiResponse = require('../utils/apiResponse');

const createAssessment = async (req, res) => {
  try {
    const { applicantId, batchId, assessmentDate, practicalMarks, theoryMarks, remarks } = req.body;
    const totalMarks = parseInt(practicalMarks) + parseInt(theoryMarks);
    const passFail = totalMarks >= 60;

    const assessment = await prisma.assessment.create({
      data: {
        applicantId,
        batchId,
        assessmentDate: new Date(assessmentDate),
        practicalMarks: parseInt(practicalMarks),
        theoryMarks: parseInt(theoryMarks),
        totalMarks,
        passFail,
        assessedBy: req.user.id,
        remarks,
      },
    });

    res.status(201).json(apiResponse(true, 'Assessment created successfully', assessment));
  } catch (error) {
    console.error('Create assessment error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getAssessments = async (req, res) => {
  try {
    const { batchId, passFail } = req.query;
    let where = {};
    if (batchId) where.batchId = batchId;
    if (passFail !== undefined) where.passFail = passFail === 'true';

    const assessments = await prisma.assessment.findMany({
      where,
      include: { applicant: true, batch: true },
      orderBy: { assessmentDate: 'desc' },
    });

    res.json(apiResponse(true, 'Assessments retrieved successfully', assessments));
  } catch (error) {
    console.error('Get assessments error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getApplicantAssessment = async (req, res) => {
  try {
    const { applicantId } = req.params;
    const assessments = await prisma.assessment.findMany({
      where: { applicantId },
      include: { batch: true },
      orderBy: { assessmentDate: 'desc' },
    });

    res.json(apiResponse(true, 'Applicant assessments retrieved successfully', assessments));
  } catch (error) {
    console.error('Get applicant assessment error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const updateAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const { practicalMarks, theoryMarks, remarks } = req.body;
    let updateData = { remarks, assessedBy: req.user.id };
    if (practicalMarks !== undefined && theoryMarks !== undefined) {
      const totalMarks = parseInt(practicalMarks) + parseInt(theoryMarks);
      updateData = {
        ...updateData,
        practicalMarks: parseInt(practicalMarks),
        theoryMarks: parseInt(theoryMarks),
        totalMarks,
        passFail: totalMarks >= 60,
      };
    }

    const assessment = await prisma.assessment.update({
      where: { id },
      data: updateData,
    });

    res.json(apiResponse(true, 'Assessment updated successfully', assessment));
  } catch (error) {
    console.error('Update assessment error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getEligibleForCertificates = async (req, res) => {
  try {
    // Eligible: attendance 100% (12 days), assessment passed, no existing certificate
    const eligibleApplicants = await prisma.applicant.findMany({
      where: {
        certificate: null,
        attendances: {
          every: { present: true },
        },
        assessments: {
          some: { passFail: true },
        },
      },
      include: { attendances: true, assessments: true },
    });

    // Filter those with exactly 12 attendances
    const filtered = eligibleApplicants.filter(app => app.attendances.length === 12);

    res.json(apiResponse(true, 'Eligible applicants retrieved successfully', filtered));
  } catch (error) {
    console.error('Get eligible for certificates error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

module.exports = {
  createAssessment,
  getAssessments,
  getApplicantAssessment,
  updateAssessment,
  getEligibleForCertificates,
};
