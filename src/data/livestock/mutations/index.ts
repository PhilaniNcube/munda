import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function createLivestock(data: Prisma.LivestockCreateInput) {
  return await prisma.livestock.create({
    data,
  });
}

export async function updateLivestock(id: string, data: Prisma.LivestockUpdateInput) {
  return await prisma.livestock.update({
    where: { id },
    data,
  });
}

export async function deleteLivestock(id: string) {
  return await prisma.livestock.delete({
    where: { id },
  });
}
