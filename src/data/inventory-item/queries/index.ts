import { prisma } from "@/lib/db";
import { InventoryCategory } from "@prisma/client";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";

export async function getInventoryItemById(id: string) {
  "use cache";
  cacheTag(`inventory-item-${id}`);
  cacheLife("minutes");
  return await prisma.inventoryItem.findUnique({
    where: { id },
  });
}

export async function getInventoryItemsByFarmId(farmId: string) {
  "use cache";
  cacheTag(`inventory-${farmId}`);
  cacheLife("minutes");
  return await prisma.inventoryItem.findMany({
    where: { farmId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getInventoryByCategory(farmId: string, category: InventoryCategory) {
  "use cache";
  cacheTag(`inventory-${farmId}`, `inventory-category-${category}-${farmId}`);
  cacheLife("minutes");
  return await prisma.inventoryItem.findMany({
    where: {
      farmId,
      category,
    },
    orderBy: { name: "asc" },
  });
}

export async function getCriticalStockAlerts(farmId: string) {
  "use cache";
  cacheTag(`inventory-${farmId}`, `critical-alerts-${farmId}`);
  cacheLife("minutes");
  // Simple logic for low stock: quantity < 50
  return await prisma.inventoryItem.findMany({
    where: {
      farmId,
      quantity: {
        lt: 50,
      },
    },
    orderBy: { quantity: "asc" },
    take: 3,
  });
}
