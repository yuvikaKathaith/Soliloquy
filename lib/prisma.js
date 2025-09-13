import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient(); 

if (process.env.NODE_ENV !== "production"){
    globalThis.prisma = db;
}

// Checks if globalThis.prisma already exist ✅ If yes → reuse it. ❌ If no → create a new Prisma client.
// globalThis.prisma: This global variable ensures that the Prisma client instance is reused across hot reloads during development. W/o this, each time your application reloads, a new instance of the Prisma client would be created, potentially leading to connection issues

// Every time you save a file, the app reloads modules.
// If you run new PrismaClient() on every reload, you end up with many database connections.
// This causes:
// ❌ Exhausted DB connections
// ❌ Performance issues
// ❌ “Too many clients” error (Postgres/MySQL especially)