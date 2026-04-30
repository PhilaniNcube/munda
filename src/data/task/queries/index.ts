import { prisma } from "@/lib/db";
import { TaskStatus } from "@prisma/client";

export async function getUpcomingTasksByFarmId(farmId: string, limit: number = 5) {
  return await prisma.task.findMany({
    where: {
      farmId,
      status: {
        in: [TaskStatus.TODO, TaskStatus.IN_PROGRESS],
      },
    },
    orderBy: [
      { priority: "desc" },
      { dueDate: "asc" },
    ],
    take: limit,
    include: {
      crop: true,
      livestock: true,
    },
  });
}

export async function getTaskById(id: string) {
  return await prisma.task.findUnique({
    where: { id },
    include: {
      crop: true,
      livestock: true,
      transactions: true,
      inventoryUsed: {
        include: {
          inventoryItem: true,
        },
      },
    },
  });
}

export async function getActiveOperationsByFarmId(farmId: string, limit: number = 5) {
  return await prisma.task.findMany({
    where: {
      farmId,
      status: TaskStatus.IN_PROGRESS,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: limit,
    include: {
      crop: true,
      livestock: true,
    },
  });
}
