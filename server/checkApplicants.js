
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function checkApplicants() {
  const applicants = await prisma.applicants.findMany({
    select: { applicant_id: true, name: true, email: true, application_status: true }
  });
  
  console.log('Test applicants in database:');
  console.log(applicants);
}

checkApplicants()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
