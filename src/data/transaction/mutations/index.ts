import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { updateTag } from "next/cache";

export async function createTransaction(data: Prisma.TransactionCreateInput) {
  const transaction = await prisma.transaction.create({
    data,
  });
  
  if (transaction.farmId) {
    updateTag(`transactions-${transaction.farmId}`);
    updateTag(`financial-summary-${transaction.farmId}`);
  }
  
  return transaction;
}

export async function updateTransaction(id: string, data: Prisma.TransactionUpdateInput) {
  const transaction = await prisma.transaction.update({
    where: { id },
    data,
  });

  if (transaction.farmId) {
    updateTag(`transactions-${transaction.farmId}`);
    updateTag(`financial-summary-${transaction.farmId}`);
  }

  return transaction;
}

export async function deleteTransaction(id: string) {
  const transaction = await prisma.transaction.delete({
    where: { id },
  });

  if (transaction.farmId) {
    updateTag(`transactions-${transaction.farmId}`);
    updateTag(`financial-summary-${transaction.farmId}`);
  }

  return transaction;
}

