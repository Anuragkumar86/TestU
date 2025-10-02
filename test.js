import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log("Prisma connected successfully!");
  } catch (err) {
    console.error("Prisma connection failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
