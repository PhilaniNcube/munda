import { prisma } from "@/lib/db";

export async function getInventoryItemById(id: string) {
  return await prisma.inventoryItem.findUnique({
    where: { id },
  });
}

export async function getInventoryItemsByFarmId(farmId: string) {
  return await prisma.inventoryItem.findMany({
    where: { farmId },
  });
}
