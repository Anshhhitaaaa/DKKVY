
// src/controllers/certificateController.js
const prisma = require('../config/db');
const apiResponse = require('../utils/apiResponse');
const { generateCertificateNo } = require('../utils/generateId');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const { cloudinary } = require('../config/cloudinary');
const { PassThrough } = require('stream');

const generateCertificate = async (req, res) => {
  try {
    const { applicantId } = req.body;
    const applicant = await prisma.applicant.findUnique({
      where: { id: applicantId },
      include: { user: true },
    });
    if (!applicant) {
      return res.status(404).json(apiResponse(false, 'Applicant not found'));
    }

    // Check eligibility
    const attendances = await prisma.attendance.findMany({ where: { applicantId } });
    const assessments = await prisma.assessment.findMany({ where: { applicantId } });
    const isEligible =
      attendances.length === 12 &&
      attendances.every(a => a.present) &&
      assessments.some(a => a.passFail);

    if (!isEligible) {
      return res.status(400).json(apiResponse(false, 'Applicant not eligible for certificate'));
    }

    const certificateNo = await generateCertificateNo();
    const verificationUrl = `${process.env.DKKVY_VERIFY_BASE_URL || 'https://dkkvy.delhi.gov.in/verify'}/${certificateNo}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl);

    // Generate PDF
    const pdfBuffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // PDF content
      doc.fontSize(24).text('Government of NCT of Delhi', { align: 'center' });
      doc.moveDown();
      doc.fontSize(20).text('Delhi Khadi & Village Industries Board', { align: 'center' });
      doc.moveDown(2);
      doc.fontSize(26).text('Certificate of Completion', { align: 'center' });
      doc.moveDown(3);
      doc.fontSize(16).text(`Certificate No: ${certificateNo}`, { align: 'left' });
      doc.moveDown();
      doc.fontSize(18).text(`This is to certify that`, { align: 'center' });
      doc.moveDown();
      doc.fontSize(22).text(applicant.name.toUpperCase(), { align: 'center' });
      doc.moveDown();
      doc.fontSize(16).text(`has successfully completed the training program in`, { align: 'center' });
      doc.moveDown();
      doc.fontSize(20).text(applicant.trainingSector.toUpperCase(), { align: 'center' });
      doc.moveDown(3);
      doc.fontSize(14).text(`Date of Issue: ${new Date().toLocaleDateString('en-IN')}`, { align: 'left' });
      doc.moveDown(4);

      // QR Code
      const qrImageBuffer = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');
      doc.image(qrImageBuffer, { fit: [100, 100], align: 'center' });
      doc.moveDown();
      doc.fontSize(10).text(verificationUrl, { align: 'center' });

      doc.end();
    });

    // Upload to Cloudinary
    const uploadStream = new PassThrough();
    uploadStream.end(pdfBuffer);
    const cloudinaryResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'dkkvy/certificates', resource_type: 'raw' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.pipe(stream);
    });

    // Save to DB
    const certificate = await prisma.certificate.create({
      data: {
        certificateNo,
        applicantId,
        issueDate: new Date(),
        qrCode: qrCodeDataUrl,
        verificationUrl,
        pdfUrl: cloudinaryResult.secure_url,
        issuedBy: req.user.id,
      },
    });

    // Update benefit
    await prisma.benefit.upsert({
      where: { applicantId },
      update: { certificateIssued: true, certificateDate: new Date() },
      create: { applicantId, certificateIssued: true, certificateDate: new Date() },
    });

    res.status(201).json(apiResponse(true, 'Certificate generated successfully', certificate));
  } catch (error) {
    console.error('Generate certificate error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const getCertificates = async (req, res) => {
  try {
    const certificates = await prisma.certificate.findMany({
      include: { applicant: true },
      orderBy: { issueDate: 'desc' },
    });
    res.json(apiResponse(true, 'Certificates retrieved successfully', certificates));
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const verifyCertificate = async (req, res) => {
  try {
    const { certNo } = req.params;
    const certificate = await prisma.certificate.findUnique({
      where: { certificateNo: certNo },
      include: { applicant: true },
    });
    if (!certificate) {
      return res.status(404).json(apiResponse(false, 'Certificate not found'));
    }
    res.json(apiResponse(true, 'Certificate is valid', certificate));
  } catch (error) {
    console.error('Verify certificate error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

const downloadCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await prisma.certificate.findUnique({ where: { id } });
    if (!certificate) {
      return res.status(404).json(apiResponse(false, 'Certificate not found'));
    }
    res.json(apiResponse(true, 'Certificate download URL', { pdfUrl: certificate.pdfUrl }));
  } catch (error) {
    console.error('Download certificate error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

module.exports = {
  generateCertificate,
  getCertificates,
  verifyCertificate,
  downloadCertificate,
};
