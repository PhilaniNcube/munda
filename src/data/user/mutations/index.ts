import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function createUser(data: Prisma.UserCreateInput) {
  return await prisma.user.create({
    data,
  });
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id },
  });
}
