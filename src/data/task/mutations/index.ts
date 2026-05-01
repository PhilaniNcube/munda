import { prisma } from "@/lib/db";
import { TaskStatus, TaskPriority, Prisma } from "@prisma/client";

export type CreateTaskInput = {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
  farmId: string;
  cropId?: string;
  livestockId?: string;
};

export async function createTask(data: CreateTaskInput) {
  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status || TaskStatus.TODO,
      priority: data.priority || TaskPriority.MEDIUM,
      dueDate: data.dueDate,
      farmId: data.farmId,
      cropId: data.cropId,
      livestockId: data.livestockId,
    },
  });
}

export async function updateTaskStatus(id: string, status: TaskStatus) {
  return await prisma.task.update({
    where: { id },
    data: { 
      status,
      completedAt: status === TaskStatus.COMPLETED ? new Date() : null,
    },
  });
}
