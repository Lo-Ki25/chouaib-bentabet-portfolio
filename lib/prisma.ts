import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Client Prisma lazy. L'auth admin (credentials env) n'en dépend pas.
 * Sans DATABASE_URL valide, l'instanciation peut échouer — n'importer
 * ce module que dans du code qui parle vraiment à MongoDB.
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
