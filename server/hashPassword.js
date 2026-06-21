import bcrypt from 'bcrypt';

async function generateHash() {
  const hash = await bcrypt.hash('Admin@12345', 12);
  console.log('Password hash for Admin@12345:');
  console.log(hash);
}

generateHash();
