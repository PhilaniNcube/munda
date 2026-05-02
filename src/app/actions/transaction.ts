"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { refresh } from "next/cache";
import { createTransaction, deleteTransaction } from "@/data/transaction/mutations";

const transactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1, "Category is required"),
  date: z.string().optional(),
});

export async function addTransactionAction(prevState: any, formData: FormData) {
  const parsed = transactionSchema.safeParse(Object.fromEntries(formData));
  
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

    const { description, amount, type, category, date } = parsed.data;

    await createTransaction({
      description,
      amount,
      type,
      category,
      date: date ? new Date(date) : new Date(),
      farm: {
        connect: { id: farm.id },
      },
    });

    // Revalidation is handled inside createTransaction mutation via updateTag
    // refresh() ensures the client-side router is updated
    refresh();
    return { success: true, message: "Transaction added successfully." };
  } catch (error: any) {
    return { 
      message: error?.message || "Failed to add transaction",
      errors: { root: [error?.message || "Failed to add transaction"] },
      success: false,
    };
  }
}

export async function deleteTransactionAction(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    // Verify ownership (or farm membership)
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: { farm: true },
    });

    if (!transaction) {
      return { success: false, message: "Transaction not found" };
    }

    if (transaction.farm.userId !== session.user.id) {
      return { success: false, message: "Unauthorized" };
    }

    await deleteTransaction(id);

    refresh();
    return { success: true, message: "Transaction deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to delete transaction" };
  }
}

