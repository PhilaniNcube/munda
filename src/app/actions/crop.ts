"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createCrop } from "@/data/crop/mutations";

const cropSchema = z.object({
  name: z.string().min(1, "Crop name is required"),
  variety: z.string().optional(),
  plantingDate: z.string().optional(),
  expectedHarvestDate: z.string().optional(),
  status: z.enum(["PLANNED", "GROWING", "HARVESTED", "FAILED"]).default("PLANNED"),
});

export async function addCropAction(prevState: any, formData: FormData) {
  const parsed = cropSchema.safeParse(Object.fromEntries(formData));
  
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

    const { name, variety, plantingDate, expectedHarvestDate, status } = parsed.data;

    await createCrop({
      name,
      variety: variety || undefined,
      status,
      plantingDate: plantingDate ? new Date(plantingDate) : undefined,
      expectedHarvestDate: expectedHarvestDate ? new Date(expectedHarvestDate) : undefined,
      farm: {
        connect: { id: farm.id },
      },
    });

    revalidatePath("/dashboard/crops-livestock");
    return { success: true, message: "Crop added successfully." };
  } catch (error: any) {
    return { 
      message: error?.message || "Failed to add crop",
      errors: { root: [error?.message || "Failed to add crop"] },
      success: false,
    };
  }
}
