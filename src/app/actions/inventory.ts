"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { InventoryCategory } from "@prisma/client";
import { createInventoryItem } from "@/data/inventory-item/mutations";

const inventoryItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.nativeEnum(InventoryCategory),
  quantity: z.coerce.number().min(0, "Quantity must be at least 0"),
  unit: z.string().min(1, "Unit is required"),
});

export async function addInventoryItemAction(prevState: any, formData: FormData) {
  const parsed = inventoryItemSchema.safeParse(Object.fromEntries(formData));
  
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

    const { name, category, quantity, unit } = parsed.data;

    await createInventoryItem({
      name,
      category,
      quantity,
      unit,
      farm: {
        connect: { id: farm.id },
      },
    });

    return { success: true, message: "Inventory item added successfully." };
  } catch (error: any) {
    return { 
      message: error?.message || "Failed to add inventory item",
      errors: { root: [error?.message || "Failed to add inventory item"] },
      success: false,
    };
  }
}
