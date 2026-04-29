import { prisma } from "@/lib/db";

export async function getFarmById(id: string) {
  return await prisma.farm.findUnique({
    where: { id },
    include: {
      user: true,
      crops: true,
      livestock: true,
      transactions: true,
      inventoryItems: true,
    },
  });
}

export async function getFarmsByUserId(userId: string) {
  return await prisma.farm.findMany({
    where: { userId },
  });
}
