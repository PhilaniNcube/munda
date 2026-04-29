import { prisma } from "@/lib/db";

export async function getCropById(id: string) {
  return await prisma.crop.findUnique({
    where: { id },
  });
}

export async function getCropsByFarmId(farmId: string) {
  return await prisma.crop.findMany({
    where: { farmId },
  });
}

export async function getActiveCropsByFarmId(farmId: string) {
  return await prisma.crop.findMany({
    where: {
      farmId,
      status: {
        in: ["PLANNED", "GROWING"],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
