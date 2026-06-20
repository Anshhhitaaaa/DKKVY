
// src/services/otpService.js
const prisma = require('../config/db');

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (mobile, purpose) => {
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + parseInt(process.env.OTP_EXPIRY_MINUTES || '10') * 60 * 1000);

  // Delete existing OTPs for this mobile and purpose
  await prisma.otpStore.deleteMany({
    where: {
      mobile,
      purpose,
    },
  });

  // Create new OTP
  await prisma.otpStore.create({
    data: {
      mobile,
      otp,
      purpose,
      expiresAt,
    },
  });

  // In a real app, send SMS via MSG91 or Fast2SMS here
  console.log(`Sending OTP ${otp} to ${mobile} for ${purpose}`);

  return { success: true, message: 'OTP sent successfully' };
};

const verifyOTP = async (mobile, otp, purpose) => {
  const otpRecord = await prisma.otpStore.findFirst({
    where: {
      mobile,
      purpose,
      verified: false,
      expiresAt: {
        gte: new Date(),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!otpRecord) {
    return { success: false, message: 'Invalid or expired OTP' };
  }

  if (otpRecord.otp !== otp) {
    return { success: false, message: 'OTP does not match' };
  }

  await prisma.otpStore.update({
    where: { id: otpRecord.id },
    data: { verified: true },
  });

  return { success: true, message: 'OTP verified successfully' };
};

module.exports = { sendOTP, verifyOTP };
