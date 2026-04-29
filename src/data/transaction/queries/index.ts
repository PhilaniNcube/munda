import { prisma } from "@/lib/db";

export async function getTransactionById(id: string) {
  return await prisma.transaction.findUnique({
    where: { id },
    include: {
      attachments: true,
    },
  });
}

export async function getTransactionsByFarmId(farmId: string) {
  return await prisma.transaction.findMany({
    where: { farmId },
    include: {
      attachments: true,
    },
  });
}
