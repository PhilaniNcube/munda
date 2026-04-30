"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { s3Client, BUCKET_NAME } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createAttachment } from "@/data/attachment/mutations";
import { revalidateTag } from "next/cache";

export async function getPresignedUploadUrlAction(
  fileName: string,
  fileType: string,
  transactionId: string
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    const key = `transactions/${transactionId}/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    console.log("Generated Pre-signed URL for key:", key);
    
    const publicUrl = `${process.env.R2_PUBLIC_DOMAIN || process.env.R2_ENDPOINT?.replace(/https?:\/\//, `https://${BUCKET_NAME}.`)}/${key}`;

    return { 
      success: true, 
      url, 
      key,
      publicUrl
    };
  } catch (error: any) {
    console.error("Error generating pre-signed URL:", error);
    return { success: false, message: error?.message || "Failed to generate upload URL" };
  }
}


export async function saveAttachmentAction(data: {
  url: string;
  name: string;
  fileType: string;
  transactionId: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    await createAttachment({
      url: data.url,
      name: data.name,
      fileType: data.fileType,
      transaction: {
        connect: { id: data.transactionId },
      },
    });

    // Revalidate the transaction to show the new attachment
    const transaction = await prisma.transaction.findUnique({
      where: { id: data.transactionId },
      select: { farmId: true },
    });

    if (transaction?.farmId) {
      revalidateTag(`transactions-${transaction.farmId}`, "max");
    }

    return { success: true, message: "Attachment saved successfully" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to save attachment" };
  }
}

export async function getPresignedViewUrlAction(attachmentId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    const attachment = await prisma.attachment.findUnique({
      where: { id: attachmentId },
    });

    if (!attachment) {
      return { success: false, message: "Attachment not found" };
    }

    // Extract the key from the stored URL
    // Our URLs are stored as: https://.../transactions/id/timestamp-name.ext
    // The key is everything after the bucket endpoint/domain
    const urlParts = attachment.url.split("/");
    const keyIndex = urlParts.indexOf("transactions");
    if (keyIndex === -1) {
      throw new Error("Invalid attachment URL format");
    }
    const key = urlParts.slice(keyIndex).join("/");

    const { GetObjectCommand } = await import("@aws-sdk/client-s3");
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour

    return { success: true, url };
  } catch (error: any) {
    console.error("Error generating view URL:", error);
    return { success: false, message: error?.message || "Failed to generate viewing URL" };
  }
}

