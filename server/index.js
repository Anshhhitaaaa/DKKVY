import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to generate login IDs
const generateLoginId = (role, name) => {
  const prefix = role === 'ADMIN' ? 'ADMIN-' : role === 'AGENCY' ? 'AGENCY-' : 'APPLICANT-';
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${randomNum}`;
};

// Helper to generate applicant ID in format DKKVY202600001
const generateApplicantId = async () => {
  const year = new Date().getFullYear();
  const prefix = `DKKVY${year}`;

  const lastApplicant = await prisma.applicants.findFirst({
    where: {
      applicant_id: {
        startsWith: prefix
      }
    },
    orderBy: {
      applicant_id: 'desc'
    }
  });

  let nextNumber = 1;
  if (lastApplicant) {
    const lastNumber = parseInt(lastApplicant.applicant_id.slice(prefix.length), 10);
    nextNumber = lastNumber + 1;
  }

  return `${prefix}${String(nextNumber).padStart(5, '0')}`;
};

// OTP functions
const sendOtp = async (email, mobile, purpose = 'REGISTRATION') => {
  const otp = '123456'; // Demo OTP
  const expiresAt = new Date(Date.now() + 60 * 1000); // 60 seconds

  await prisma.otp_store.create({
    data: {
      email,
      mobile: mobile || null,
      otp,
      purpose,
      expires_at: expiresAt
    }
  });

  console.log(`[MOCK EMAIL] OTP for ${email}: ${otp}`);
  return otp;
};

const verifyOtp = async (email, otp, purpose = 'REGISTRATION') => {
  const otpRecord = await prisma.otp_store.findFirst({
    where: {
      email,
      otp,
      purpose,
      verified: false,
      expires_at: {
        gt: new Date()
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  if (!otpRecord) {
    return false;
  }

  await prisma.otp_store.update({
    where: { id: otpRecord.id },
    data: { verified: true }
  });

  return true;
};

// Auth middleware - general
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Auth middleware - admin only
const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.admin = decoded; // { id, adminId, role, email, name }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// API Routes

// Auth routes
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { email, mobile } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    await sendOtp(email, mobile);
    res.json({ success: true, message: 'OTP sent successfully', demoOtp: '123456' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const isValid = await verifyOtp(email, otp);

    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/auth/register/applicant', async (req, res) => {
  try {
    const { 
      password, 
      confirmPassword, 
      idProofType, 
      idProofNumber, 
      fatherMotherName, 
      preferredAgency,
      ...data 
    } = req.body;
    
    // Duplicate checks
    const existingByMobile = await prisma.applicants.findUnique({ where: { mobile: data.mobile } });
    if (existingByMobile) {
      return res.status(409).json({ success: false, message: 'An applicant is already registered with this mobile number' });
    }

    const existingByEmail = await prisma.applicants.findUnique({ where: { email: data.email } });
    if (existingByEmail) {
      return res.status(409).json({ success: false, message: 'An applicant is already registered with this email address' });
    }

    const existingByIdProof = await prisma.applicants.findUnique({ where: { id_proof_number: idProofNumber } });
    if (existingByIdProof) {
      return res.status(409).json({ success: false, message: 'An applicant is already registered with this ID proof number' });
    }

    const existingByBankAccount = await prisma.applicants.findUnique({ where: { bank_account: data.bankAccount } });
    if (existingByBankAccount) {
      return res.status(409).json({ success: false, message: 'An applicant is already registered with this bank account number' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const applicantId = await generateApplicantId();
    
    // Map frontend fields to database fields
    const dbData = {
      applicant_id: applicantId,
      name: data.name,
      father_mother_name: fatherMotherName,
      dob: new Date(data.dob),
      gender: data.gender,
      address: data.address,
      mobile: data.mobile,
      email: data.email,
      password_hash: hashedPassword,
      id_proof_type: idProofType,
      id_proof_number: idProofNumber,
      bank_account: data.bankAccount,
      ifsc_code: data.ifscCode,
      bank_name: data.bankName || null,
      account_holder: data.accountHolder,
      training_sector: data.trainingSector,
      preferred_agency: preferredAgency || null,
      application_status: 'PENDING',
      mobile_verified: true
    };

    const applicant = await prisma.applicants.create({
      data: dbData
    });

    const { password_hash: _, ...applicantWithoutPassword } = applicant;
    res.status(201).json({ 
      success: true, 
      loginId: applicantId,
      data: applicantWithoutPassword 
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 'P2002') { // Prisma unique constraint violation
      return res.status(409).json({ 
        success: false, 
        message: 'Duplicate entry - mobile, email, bank account or ID proof already registered' 
      });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { loginId, password, role } = req.body;
    console.log('Login request:', { loginId, role });
    let user;
    
    if (role === 'AGENCY') {
      user = await prisma.agencies.findUnique({ where: { login_id: loginId } });
    } else {
      user = await prisma.applicants.findUnique({ where: { applicant_id: loginId } });
    }

    console.log('Found user:', user ? user.applicant_id || user.login_id : 'none');
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid login ID or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    console.log('Password match:', passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: 'Invalid login ID or password' });
    }

    if (role === 'AGENCY' && user.status !== 'APPROVED') {
      return res.status(403).json({ success: false, error: 'Your agency is not approved yet' });
    }

    // Allow applicants to log in even if not approved
    // if (role === 'APPLICANT' && user.application_status !== 'APPROVED') {
    //   return res.status(403).json({ success: false, error: 'Your application is not approved yet' });
    // }

    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
    const { password_hash: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      token,
      user: userWithoutPassword,
      role
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    let user;
    if (req.user.role === 'DKKVY_ADMIN') {
      user = await prisma.admins.findUnique({ where: { id: req.user.id } });
    } else if (req.user.role === 'AGENCY') {
      user = await prisma.agencies.findUnique({ where: { id: req.user.id } });
    } else {
      user = await prisma.applicants.findUnique({ where: { id: req.user.id } });
    }
    const { password_hash: _, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword, role: req.user.role });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin routes
app.post('/api/admins/login', async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({ success: false, message: 'Admin ID and password are required' });
    }

    const admin = await prisma.admins.findUnique({
      where: { admin_id: loginId }
    });

    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid Admin ID or password' });
    }

    if (admin.status !== 'ACTIVE') {
      return res.status(403).json({ success: false, error: 'This account is inactive' });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid Admin ID or password' });
    }

    const token = jwt.sign(
      { id: admin.id, adminId: admin.admin_id, role: admin.role, email: admin.email, name: admin.name },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const { password_hash: _, ...adminWithoutPassword } = admin;

    res.json({ success: true, message: 'Login successful', user: adminWithoutPassword, token, role: 'DKKVY_ADMIN' });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Applicant approval routes (admin only)
app.get('/api/admin/applicants/pending', verifyAdminToken, async (req, res) => {
  try {
    const applicants = await prisma.applicants.findMany({
      where: { application_status: 'PENDING' },
      select: {
        applicant_id: true,
        name: true,
        mobile: true,
        email: true,
        training_sector: true,
        application_status: true,
        created_at: true
      },
      orderBy: { created_at: 'asc' }
    });

    res.json({ success: true, data: applicants });
  } catch (error) {
    console.error('Get pending applicants error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/admin/applicants/:applicantId/approve', verifyAdminToken, async (req, res) => {
  try {
    const { applicantId } = req.params;
    const adminId = req.admin.id;

    const updatedApplicant = await prisma.applicants.update({
      where: { applicant_id: applicantId },
      data: {
        application_status: 'APPROVED',
        approved_by: adminId,
        approved_at: new Date()
      },
      select: {
        applicant_id: true,
        name: true,
        application_status: true,
        approved_at: true
      }
    });

    res.json({ success: true, message: 'Applicant approved successfully', data: updatedApplicant });
  } catch (error) {
    console.error('Approve applicant error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Applicant not found' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/admin/applicants/:applicantId/reject', verifyAdminToken, async (req, res) => {
  try {
    const { applicantId } = req.params;
    const { rejectionReason } = req.body;
    const adminId = req.admin.id;

    if (!rejectionReason) {
      return res.status(400).json({ success: false, message: 'Rejection reason is required' });
    }

    const updatedApplicant = await prisma.applicants.update({
      where: { applicant_id: applicantId },
      data: {
        application_status: 'REJECTED',
        approved_by: adminId,
        approved_at: new Date(),
        rejection_reason: rejectionReason
      },
      select: {
        applicant_id: true,
        name: true,
        application_status: true,
        rejection_reason: true
      }
    });

    res.json({ success: true, message: 'Applicant rejected', data: updatedApplicant });
  } catch (error) {
    console.error('Reject applicant error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Applicant not found' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Endpoint to get applicant details by applicant ID
app.get('/api/applicants/:applicantId', async (req, res) => {
  try {
    const { applicantId } = req.params;

    const applicant = await prisma.applicants.findUnique({
      where: { applicant_id: applicantId },
      select: {
        applicant_id: true,
        name: true,
        father_mother_name: true,
        dob: true,
        gender: true,
        address: true,
        mobile: true,
        email: true,
        id_proof_type: true,
        id_proof_number: true,
        bank_account: true,
        ifsc_code: true,
        bank_name: true,
        account_holder: true,
        training_sector: true,
        preferred_agency: true,
        application_status: true,
        mobile_verified: true,
        created_at: true,
        approved_by: true,
        approved_at: true,
        rejection_reason: true
      }
    });

    if (!applicant) {
      return res.status(404).json({ success: false, message: 'Applicant not found' });
    }

    res.json({ success: true, data: applicant });
  } catch (error) {
    console.error('Get applicant error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
