"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createTask } from "@/data/task/mutations";
import { getFarmsByUserId } from "@/data/farm/queries";
import { TaskStatus, TaskPriority } from "@prisma/client";

const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  priority: z.nativeEnum(TaskPriority),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.TODO),
  dueDate: z.string().optional().transform(v => v ? new Date(v) : undefined),
  cropId: z.string().optional(),
  livestockId: z.string().optional(),
});

export async function createTaskAction(prevState: any, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const farms = await getFarmsByUserId(session.user.id);
  const farm = farms[0];
  if (!farm) {
    return { error: "No farm found for this user" };
  }

  const validatedFields = createTaskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority"),
    status: formData.get("status"),
    dueDate: formData.get("dueDate"),
    cropId: formData.get("cropId") || undefined,
    livestockId: formData.get("livestockId") || undefined,
  });

  if (!validatedFields.success) {
    return {
      error: "Validation failed",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await createTask({
      ...validatedFields.data,
      farmId: farm.id,
    });

    revalidatePath("/dashboard/tasks");
    return { success: true };
  } catch (error) {
    console.error("Failed to create task:", error);
    return { error: "Failed to create task" };
  }
}
