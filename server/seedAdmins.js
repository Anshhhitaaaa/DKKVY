import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seed() {
  const hash = '$2b$12$OzBgRXG/RgoxqNN8TsEb9uEt2UjIFdM8onj6fcgvS44nqbqoffP.S';

  const admins = [
    {
      admin_id: 'ADM-2026-00001',
      name: 'Anshita Agrawal',
      email: 'admin@dkkvy.delhi.gov.in',
      password_hash: Anshita123,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE'
    },
    {
      admin_id: 'ADM-2026-00002',
      name: 'Abhilash Agrawal',
      email: 'Abhilash.admin@dkkvy.delhi.gov.in',
      password_hash: Abhilash123,
      role: 'DKVIB_ADMIN',
      status: 'ACTIVE'
    },
    {
      admin_id: 'ADM-2026-00003',
      name: 'Manoj',
      email: 'manoj.finance@dkkvy.delhi.gov.in',
      password_hash: Manoj123,
      role: 'FINANCE_OFFICER',
      status: 'ACTIVE'
    }
  ];

  for (const admin of admins) {
    await prisma.admins.upsert({
      where: { email: admin.email },
      update: {},
      create: admin
    });
    console.log(`Created/updated admin: ${admin.name} (${admin.email})`);
  }

  console.log('Admin seeding complete!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
