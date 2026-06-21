
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function verifyPasswords() {
  const applicants = await prisma.applicants.findMany({
    select: { applicant_id: true, password_hash: true }
  });
  
  for (const app of applicants) {
    const testPasswords = ['Rahul123', 'Priya123', 'Rahul@123', 'Priya@123'];
    for (const testPw of testPasswords) {
      const match = await bcrypt.compare(testPw, app.password_hash);
      if (match) {
        console.log(`${app.applicant_id} matches: ${testPw}`);
      }
    }
  }
}

verifyPasswords()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
