
// src/controllers/attendanceController.js
const prisma = require('../config/db');
const apiResponse = require('../utils/apiResponse');
const { sendOTP, verifyOTP } = require('../services/otpService');

const sendAttendanceOTP = async (req, res) => {
  try {
    const { batchId, applicantId } = req.body;
    const applicant = await prisma.applicant.findUnique({ where: { id: applicantId } });
    if (!applicant) {
      return res.status(404).json(apiResponse(false, 'Applicant not found'));
    }
    await sendOTP(applicant.mobile, 'ATTENDANCE');
    res.json(apiResponse(true, 'OTP sent successfully'));
  } catch (error) {
    console.error('Send attendance OTP error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const markAttendance = async (req, res) => {
  try {
    const { batchId, applicantId, date, dayNumber, otp, present, photoUrl, geoLocation } = req.body;
    let otpVerified = false;

    if (otp) {
      const applicant = await prisma.applicant.findUnique({ where: { id: applicantId } });
      const otpResult = await verifyOTP(applicant.mobile, otp, 'ATTENDANCE');
      otpVerified = otpResult.success;
      if (!otpVerified) {
        return res.status(400).json(apiResponse(false, 'Invalid or expired OTP'));
      }
    }

    const attendance = await prisma.attendance.create({
      data: {
        batchId,
        applicantId,
        date: new Date(date),
        dayNumber: parseInt(dayNumber),
        present: present === true || present === 'true',
        otpVerified,
        photoUrl,
        geoLocation,
        markedBy: req.user.id,
      },
    });

    res.status(201).json(apiResponse(true, 'Attendance marked successfully', attendance));
  } catch (error) {
    console.error('Mark attendance error:', error);
    if (error.code === 'P2002') {
      return res.status(409).json(apiResponse(false, 'Attendance for this applicant and date already exists'));
    }
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const bulkMarkAttendance = async (req, res) => {
  try {
    const { batchId, date, dayNumber, attendances } = req.body;
    const createdAttendances = [];

    for (const att of attendances) {
      let otpVerified = false;
      if (att.otp) {
        const applicant = await prisma.applicant.findUnique({ where: { id: att.applicantId } });
        const otpResult = await verifyOTP(applicant.mobile, att.otp, 'ATTENDANCE');
        otpVerified = otpResult.success;
      }
      const attendance = await prisma.attendance.create({
        data: {
          batchId,
          applicantId: att.applicantId,
          date: new Date(date),
          dayNumber: parseInt(dayNumber),
          present: att.present === true || att.present === 'true',
          otpVerified,
          photoUrl: att.photoUrl,
          geoLocation: att.geoLocation,
          markedBy: req.user.id,
        },
      });
      createdAttendances.push(attendance);
    }

    res.status(201).json(apiResponse(true, 'Bulk attendance marked successfully', createdAttendances));
  } catch (error) {
    console.error('Bulk mark attendance error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getAttendanceByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const { date } = req.query;
    let where = { batchId };
    if (date) where.date = new Date(date);

    const attendances = await prisma.attendance.findMany({
      where,
      include: { applicant: true },
      orderBy: { date: 'desc' },
    });

    res.json(apiResponse(true, 'Attendance retrieved successfully', attendances));
  } catch (error) {
    console.error('Get attendance by batch error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getApplicantAttendance = async (req, res) => {
  try {
    const { batchId, applicantId } = req.params;
    const attendances = await prisma.attendance.findMany({
      where: { batchId, applicantId },
      orderBy: { dayNumber: 'asc' },
    });

    res.json(apiResponse(true, 'Applicant attendance retrieved successfully', attendances));
  } catch (error) {
    console.error('Get applicant attendance error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getAttendancePercentage = async (req, res) => {
  try {
    const { applicantId } = req.params;
    const attendances = await prisma.attendance.findMany({ where: { applicantId } });
    const presentCount = attendances.filter(a => a.present).length;
    const totalCount = attendances.length;
    const percentage = totalCount > 0 ? (presentCount / totalCount) * 100 : 0;

    res.json(apiResponse(true, 'Attendance percentage calculated', {
      presentCount,
      totalCount,
      percentage,
      eligible: percentage === 100 && totalCount === 12,
    }));
  } catch (error) {
    console.error('Get attendance percentage error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

module.exports = {
  sendAttendanceOTP,
  markAttendance,
  bulkMarkAttendance,
  getAttendanceByBatch,
  getApplicantAttendance,
  getAttendancePercentage,
};
