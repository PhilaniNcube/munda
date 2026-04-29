import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function createInventoryItem(data: Prisma.InventoryItemCreateInput) {
  return await prisma.inventoryItem.create({
    data,
  });
}

export async function updateInventoryItem(id: string, data: Prisma.InventoryItemUpdateInput) {
  return await prisma.inventoryItem.update({
    where: { id },
    data,
  });
}

export async function deleteInventoryItem(id: string) {
  return await prisma.inventoryItem.delete({
    where: { id },
  });
}
