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

export async function getTasksByFarmId(params: {
  farmId: string;
  status?: TaskStatus;
  priority?: string;
  category?: string;
  page?: number;
  limit?: number;
}) {
  const { farmId, status, priority, category, page = 1, limit = 10 } = params;
  const skip = (page - 1) * limit;

  const where: any = { farmId };
  if (status) where.status = status;
  if (priority) where.priority = priority;
  
  // Category filtering based on linked crop or livestock
  if (category === "CROPS") {
    where.cropId = { not: null };
  } else if (category === "LIVESTOCK") {
    where.livestockId = { not: null };
  } else if (category === "GENERAL") {
    where.cropId = null;
    where.livestockId = null;
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        crop: true,
        livestock: true,
      },
    }),
    prisma.task.count({ where }),
  ]);

  return { tasks, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getTasksDueTodayCount(farmId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return await prisma.task.count({
    where: {
      farmId,
      dueDate: {
        gte: today,
        lt: tomorrow,
      },
      status: {
        not: TaskStatus.COMPLETED,
      },
    },
  });
}

export async function getInProgressTasksCount(farmId: string) {
  return await prisma.task.count({
    where: {
      farmId,
      status: TaskStatus.IN_PROGRESS,
    },
  });
}

export async function getCriticalTasksCount(farmId: string) {
  return await prisma.task.count({
    where: {
      farmId,
      priority: "CRITICAL",
      status: {
        not: TaskStatus.COMPLETED,
      },
    },
  });
}
