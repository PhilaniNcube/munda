import { prisma } from "@/lib/db";

export async function getLivestockById(id: string) {
  return await prisma.livestock.findUnique({
    where: { id },
  });
}

export async function getLivestockByFarmId(farmId: string) {
  return await prisma.livestock.findMany({
    where: { farmId },
  });
}
