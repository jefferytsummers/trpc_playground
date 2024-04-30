import { PrismaClient } from '@prisma/client';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';

export async function createContext(opts: CreateNextContextOptions) {
  const { req, res } = opts;
  const prisma = new PrismaClient();
  return {
    req,
    res,
    prisma,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>

