import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function createInventoryItem(data: Prisma.InventoryItemCreateInput) {
  const item = await prisma.inventoryItem.create({
    data,
  });

  if (item.farmId) {
    revalidateTag(`inventory-${item.farmId}`, "max");
  }

  return item;
}

export async function updateInventoryItem(id: string, data: Prisma.InventoryItemUpdateInput) {
  const item = await prisma.inventoryItem.update({
    where: { id },
    data,
  });

  if (item.farmId) {
    revalidateTag(`inventory-${item.farmId}`, "max");
  }

  return item;
}

export async function deleteInventoryItem(id: string) {
  const item = await prisma.inventoryItem.delete({
    where: { id },
  });

  if (item.farmId) {
    revalidateTag(`inventory-${item.farmId}`, "max");
  }

  return item;
}
