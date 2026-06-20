
// src/utils/generateId.js
const prisma = require('../config/db');

const generateApplicantId = async () => {
  const currentYear = new Date().getFullYear();
  const yearPrefix = `DKKVY${currentYear}`;

  const lastApplicant = await prisma.applicant.findFirst({
    where: {
      applicantId: {
        startsWith: yearPrefix,
      },
    },
    orderBy: {
      applicantId: 'desc',
    },
  });

  let newNumber = 1;
  if (lastApplicant) {
    const lastNumber = parseInt(lastApplicant.applicantId.slice(-5), 10);
    newNumber = lastNumber + 1;
  }

  return `${yearPrefix}${newNumber.toString().padStart(5, '0')}`;
};

const generateBatchCode = async (sector) => {
  const currentYear = new Date().getFullYear();
  const sectorAbbr = sector.slice(0, 3).toUpperCase();
  const prefix = `BATCH-${currentYear}-${sectorAbbr}`;

  const lastBatch = await prisma.batch.findFirst({
    where: {
      batchCode: {
        startsWith: prefix,
      },
    },
    orderBy: {
      batchCode: 'desc',
    },
  });

  let newNumber = 1;
  if (lastBatch) {
    const lastNumber = parseInt(lastBatch.batchCode.slice(-3), 10);
    newNumber = lastNumber + 1;
  }

  return `${prefix}-${newNumber.toString().padStart(3, '0')}`;
};

const generateCertificateNo = async () => {
  const currentYear = new Date().getFullYear();
  const prefix = `DKKVY-CERT-${currentYear}`;

  const lastCertificate = await prisma.certificate.findFirst({
    where: {
      certificateNo: {
        startsWith: prefix,
      },
    },
    orderBy: {
      certificateNo: 'desc',
    },
  });

  let newNumber = 1;
  if (lastCertificate) {
    const lastNumber = parseInt(lastCertificate.certificateNo.slice(-5), 10);
    newNumber = lastNumber + 1;
  }

  return `${prefix}-${newNumber.toString().padStart(5, '0')}`;
};

module.exports = { generateApplicantId, generateBatchCode, generateCertificateNo };
