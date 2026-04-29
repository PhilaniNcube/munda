import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function createFarm(data: Prisma.FarmCreateInput) {
  return await prisma.farm.create({
    data,
  });
}

export async function updateFarm(id: string, data: Prisma.FarmUpdateInput) {
  return await prisma.farm.update({
    where: { id },
    data,
  });
}

export async function deleteFarm(id: string) {
  return await prisma.farm.delete({
    where: { id },
  });
}
