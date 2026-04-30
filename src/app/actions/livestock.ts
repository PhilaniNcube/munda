"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createLivestock } from "@/data/livestock/mutations";

const livestockSchema = z.object({
  type: z.string().min(1, "Livestock type is required"),
  breed: z.string().optional(),
  quantity: z.coerce.number().min(0, "Quantity must be at least 0"),
  healthStatus: z.string().optional(),
});

export async function addLivestockAction(prevState: any, formData: FormData) {
  const parsed = livestockSchema.safeParse(Object.fromEntries(formData));
  
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Please check your inputs.",
      success: false,
    };
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { message: "Unauthorized", errors: { root: ["Unauthorized"] }, success: false };
    }

    // Get the user's farm
    const farm = await prisma.farm.findFirst({
      where: { userId: session.user.id },
    });

    if (!farm) {
      return { message: "No farm found", errors: { root: ["No farm found for this user"] }, success: false };
    }

    const { type, breed, quantity, healthStatus } = parsed.data;

    await createLivestock({
      type,
      breed: breed || undefined,
      quantity,
      healthStatus: healthStatus || undefined,
      farm: {
        connect: { id: farm.id },
      },
    });

    revalidatePath("/dashboard/crops-livestock");
    return { success: true, message: "Livestock added successfully." };
  } catch (error: any) {
    return { 
      message: error?.message || "Failed to add livestock",
      errors: { root: [error?.message || "Failed to add livestock"] },
      success: false,
    };
  }
}
