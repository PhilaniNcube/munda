import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function createAttachment(data: Prisma.AttachmentCreateInput) {
  return await prisma.attachment.create({
    data,
  });
}

export async function updateAttachment(id: string, data: Prisma.AttachmentUpdateInput) {
  return await prisma.attachment.update({
    where: { id },
    data,
  });
}

export async function deleteAttachment(id: string) {
  return await prisma.attachment.delete({
    where: { id },
  });
}
