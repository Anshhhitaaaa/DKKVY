
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function updateApplicantPasswords() {
  // Hash new passwords
  const rahulHash = await bcrypt.hash('Rahul123', 12);
  const priyaHash = await bcrypt.hash('Priya123', 12);

  // Update in database
  await prisma.applicants.update({
    where: { applicant_id: 'DKKVY202600001' },
    data: { password_hash: rahulHash }
  });
  console.log('Updated password for DKKVY202600001 (Rahul)');

  await prisma.applicants.update({
    where: { applicant_id: 'DKKVY202600002' },
    data: { password_hash: priyaHash }
  });
  console.log('Updated password for DKKVY202600002 (Priya)');

  console.log('All passwords updated!');
}

updateApplicantPasswords()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
