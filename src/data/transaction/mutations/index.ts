import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function createTransaction(data: Prisma.TransactionCreateInput) {
  return await prisma.transaction.create({
    data,
  });
}

export async function updateTransaction(id: string, data: Prisma.TransactionUpdateInput) {
  return await prisma.transaction.update({
    where: { id },
    data,
  });
}

export async function deleteTransaction(id: string) {
  return await prisma.transaction.delete({
    where: { id },
  });
}
