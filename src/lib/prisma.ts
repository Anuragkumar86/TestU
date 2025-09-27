import { PrismaClient } from '@prisma/client'

// 1. Declare a global variable to hold the Prisma Client instance.
// This is necessary to prevent the creation of a new client on every hot-reload in development.
declare global {
  var prisma: PrismaClient | undefined
}

// 2. Reuse the existing Prisma Client instance if it exists.
// Otherwise, create a new one.
const prisma = global.prisma || new PrismaClient({
    log: ['query'], // This option is helpful for debugging database queries.
});

// 3. In development, save the Prisma Client instance to the global variable.
// This prevents multiple instances from being created during hot-reloads.
if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma;
}

// 4. Export the single, shared instance of the Prisma Client.
export default prisma;