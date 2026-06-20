
// src/middleware/duplicateCheck.js
const prisma = require('../config/db');
const { encrypt } = require('../utils/encryption');
const apiResponse = require('../utils/apiResponse');

const duplicateCheck = async (req, res, next) => {
  try {
    const { mobile, idProofNumber, bankAccount, trainingSector } = req.body;

    // Check mobile
    const mobileExists = await prisma.applicant.findUnique({ where: { mobile } });
    if (mobileExists) {
      return res.status(409).json(apiResponse(false, 'Applicant with this mobile number already exists'));
    }

    // Encrypt and check idProofNumber
    const encryptedIdProof = encrypt(idProofNumber);
    const idProofExists = await prisma.applicant.findUnique({ where: { idProofNumber: encryptedIdProof } });
    if (idProofExists) {
      return res.status(409).json(apiResponse(false, 'Applicant with this ID proof number already exists'));
    }

    // Encrypt and check bankAccount
    const encryptedBankAccount = encrypt(bankAccount);
    const bankAccountExists = await prisma.applicant.findUnique({ where: { bankAccount: encryptedBankAccount } });
    if (bankAccountExists) {
      return res.status(409).json(apiResponse(false, 'Applicant with this bank account already exists'));
    }

    // Check training history for same sector
    if (req.user) {
      const trainingHistoryExists = await prisma.trainingHistory.findFirst({
        where: {
          applicant: {
            userId: req.user.id,
          },
          sector: trainingSector,
          status: 'COMPLETED',
        },
      });
      if (trainingHistoryExists) {
        return res.status(409).json(apiResponse(false, 'Applicant has already completed training in this sector'));
      }
    }

    // Store encrypted values in request for later use
    req.encryptedData = {
      idProofNumber: encryptedIdProof,
      bankAccount: encryptedBankAccount,
    };

    next();
  } catch (error) {
    console.error('Duplicate check error:', error);
    res.status(500).json(apiResponse(false, 'Internal server error'));
  }
};

module.exports = duplicateCheck;
