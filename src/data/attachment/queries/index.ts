import { prisma } from "@/lib/db";

export async function getAttachmentById(id: string) {
  return await prisma.attachment.findUnique({
    where: { id },
  });
}

export async function getAttachmentsByTransactionId(transactionId: string) {
  return await prisma.attachment.findMany({
    where: { transactionId },
  });
}
