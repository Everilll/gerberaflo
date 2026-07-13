import 'dotenv/config';

import { AdminRole, PrismaClient } from '@prisma/client';
import { randomBytes, scryptSync } from 'node:crypto';
import { HashingService } from 'src/common/hashing/hashing.service';

const prisma = new PrismaClient();
const hashingService = new HashingService();

async function main() {
  const email = process.env.SEED_SUPERADMIN_EMAIL ?? 'superadmin@gerberaflo.local';
  const password = process.env.SEED_SUPERADMIN_PASSWORD ?? 'SuperAdmin123!';
  const name = process.env.SEED_SUPERADMIN_NAME ?? 'Super Admin';

  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log(`Superadmin already exists: ${email}`);
    return;
  }

  const hashedPassword = hashingService.hash(password);

  await prisma.admin.create({
    data: {
      email,
      name,
      passwordHash: hashedPassword,
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
    },
  });

  console.log(`Superadmin seeded: ${email}`);
}

main()
  .catch((error) => {
    console.error('Failed to seed superadmin');
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });