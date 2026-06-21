import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function updateAdminPasswords() {
  const admins = [
    {
      admin_id: 'ADM-2026-00001',
      password: 'Anshita123'
    },
    {
      admin_id: 'ADM-2026-00002',
      password: 'Abhilash123'
    },
    {
      admin_id: 'ADM-2026-00003',
      password: 'Manoj123'
    }
  ];

  for (const admin of admins) {
    const hash = await bcrypt.hash(admin.password, 12);
    await prisma.admins.update({
      where: { admin_id: admin.admin_id },
      data: { password_hash: hash }
    });
    console.log(`Updated password for ${admin.admin_id}`);
  }
  console.log('All admin passwords updated!');
}

updateAdminPasswords()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
