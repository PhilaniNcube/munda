import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function createCrop(data: Prisma.CropCreateInput) {
  return await prisma.crop.create({
    data,
  });
}

export async function updateCrop(id: string, data: Prisma.CropUpdateInput) {
  return await prisma.crop.update({
    where: { id },
    data,
  });
}

export async function deleteCrop(id: string) {
  return await prisma.crop.delete({
    where: { id },
  });
}
