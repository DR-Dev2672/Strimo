import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

// async function checkDbConnection() {
//   try {
//     await db.$queryRaw`SELECT 1`;
//     console.log("✅ Database connected successfully");
//   } catch (error) {
//     console.error("❌ Database connection failed:", error);
//   }
// }

// // Run check immediately
// checkDbConnection();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

