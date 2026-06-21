require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('./generated/prisma');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// Auth middleware
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

// API Routes
app.post('/api/auth/register/admin', async (req, res) => {
  try {
    const { name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const loginId = generateLoginId('ADMIN', name);
    const admin = await prisma.admin.create({
      data: { loginId, password: hashedPassword, name }
    });
    res.status(201).json({ success: true, loginId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/register/applicant', async (req, res) => {
  try {
    const { password, ...data } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const loginId = generateLoginId('APPLICANT', data.name);
    const applicant = await prisma.applicant.create({
      data: { ...data, loginId, password: hashedPassword, dob: new Date(data.dob) }
    });
    res.status(201).json({ success: true, loginId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/register/agency', async (req, res) => {
  try {
    const { password, ...data } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const loginId = generateLoginId('AGENCY', data.orgName);
    const agency = await prisma.agency.create({
      data: { 
        ...data, 
        loginId, 
        password: hashedPassword, 
        registrationDate: new Date(data.registrationDate),
        declarationDate: data.declarationDate ? new Date(data.declarationDate) : null,
      }
    });
    res.status(201).json({ success: true, loginId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { loginId, password, role } = req.body;
    let user;
    
    if (role === 'DKKVY_ADMIN') {
      user = await prisma.admin.findUnique({ where: { loginId } });
    } else if (role === 'AGENCY') {
      user = await prisma.agency.findUnique({ where: { loginId } });
    } else {
      user = await prisma.applicant.findUnique({ where: { loginId } });
    }

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid login ID or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: 'Invalid login ID or password' });
    }

    if (role === 'AGENCY' && user.status !== 'APPROVED') {
      return res.status(403).json({ success: false, error: 'Your agency is not approved yet' });
    }

    if (role === 'APPLICANT' && user.status !== 'APPROVED') {
      return res.status(403).json({ success: false, error: 'Your application is not approved yet' });
    }

    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      token,
      user: userWithoutPassword,
      role
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    let user;
    if (req.user.role === 'DKKVY_ADMIN') {
      user = await prisma.admin.findUnique({ where: { id: req.user.id } });
    } else if (req.user.role === 'AGENCY') {
      user = await prisma.agency.findUnique({ where: { id: req.user.id } });
    } else {
      user = await prisma.applicant.findUnique({ where: { id: req.user.id } });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword, role: req.user.role });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
