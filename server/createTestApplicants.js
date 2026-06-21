import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function createTestApplicants() {
  // First, get an admin for approval
  const admin = await prisma.admins.findFirst({ where: { role: 'SUPER_ADMIN' } });

  const applicants = [
    {
      applicant_id: 'DKKVY202600001',
      name: 'Rahul Sharma',
      father_mother_name: 'Rajesh Sharma',
      dob: new Date('2000-05-15'),
      gender: 'MALE',
      address: '123 Main Street, New Delhi',
      mobile: '9876543210',
      email: 'rahul@example.com',
      password_hash: await bcrypt.hash('Rahul@123', 12),
      id_proof_type: 'AADHAAR',
      id_proof_number: '123456789012',
      bank_account: '1234567890123456',
      ifsc_code: 'HDFC0001234',
      bank_name: 'HDFC Bank',
      account_holder: 'Rahul Sharma',
      training_sector: 'Beauty & Wellness',
      preferred_agency: 'DKKVY Training Center - Dwarka',
      application_status: 'APPROVED',
      approved_by: admin.id,
      approved_at: new Date(),
      mobile_verified: true
    },
    {
      applicant_id: 'DKKVY202600002',
      name: 'Priya Patel',
      father_mother_name: 'Ramesh Patel',
      dob: new Date('1999-12-20'),
      gender: 'FEMALE',
      address: '456 Park Avenue, Mumbai',
      mobile: '9876543211',
      email: 'priya@example.com',
      password_hash: await bcrypt.hash('Priya@123', 12),
      id_proof_type: 'VOTER_ID',
      id_proof_number: 'ABC1234567',
      bank_account: '2345678901234567',
      ifsc_code: 'SBI0001234',
      bank_name: 'State Bank of India',
      account_holder: 'Priya Patel',
      training_sector: 'Retail',
      preferred_agency: 'DKKVY Training Center - Connaught Place',
      application_status: 'APPROVED',
      approved_by: admin.id,
      approved_at: new Date(),
      mobile_verified: true
    }
  ];

  for (const applicant of applicants) {
    await prisma.applicants.upsert({
      where: { applicant_id: applicant.applicant_id },
      update: {},
      create: applicant
    });
    console.log(`Created/updated applicant: ${applicant.name} (${applicant.applicant_id})`);
  }
  console.log('Test applicants created and approved!');
}

createTestApplicants()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
