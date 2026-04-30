import { MoreHorizontal, Clock, CalendarDays, AlertTriangle, Sprout, PawPrint, CheckCircle2, Circle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFarmsByUserId } from "@/data/farm/queries";
import { getUpcomingTasksByFarmId } from "@/data/task/queries";
import { TaskPriority, TaskStatus } from "@prisma/client";

export async function UpcomingTasks() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) return null;

  const farms = await getFarmsByUserId(session.user.id);
  const farm = farms[0];
  if (!farm) return null;

  const dbTasks = await getUpcomingTasksByFarmId(farm.id, 3);

  const getPriorityStyles = (priority: TaskPriority) => {
    switch (priority) {
      case "CRITICAL":
        return {
          iconColor: "text-agri-error",
          borderColor: "border-agri-error",
          icon: AlertTriangle,
        };
      case "HIGH":
        return {
          iconColor: "text-agri-secondary",
          borderColor: "border-agri-secondary",
          icon: Clock,
        };
      case "MEDIUM":
        return {
          iconColor: "text-agri-primary",
          borderColor: "border-agri-primary",
          icon: Sprout,
        };
      case "LOW":
      default:
        return {
          iconColor: "text-agri-on-surface-variant",
          borderColor: "border-agri-outline-variant",
          icon: Circle,
        };
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "No due date";
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <Card className="shadow-sm border-agri-outline-variant flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-agri-on-surface">Upcoming Tasks</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-agri-on-surface-variant">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        {dbTasks.length > 0 ? (
          dbTasks.map((task) => {
            const styles = getPriorityStyles(task.priority);
            const Icon = task.status === TaskStatus.IN_PROGRESS ? Clock : styles.icon;
            
            return (
              <div
                key={task.id}
                className={`flex items-start gap-3 p-3 bg-agri-surface-container-low rounded-md border-l-4 ${styles.borderColor}`}
              >
                <div className="pt-0.5">
                  <Icon className={`h-4 w-4 ${styles.iconColor}`} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-agri-on-surface">{task.title}</span>
                  <div className="flex items-center gap-1.5 text-xs text-agri-on-surface-variant">
                    <span>{task.status === TaskStatus.IN_PROGRESS ? "In Progress" : formatDate(task.dueDate)}</span>
                    {task.crop && (
                      <span className="flex items-center gap-1 before:content-['•'] before:mr-1">
                        {task.crop.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-8 w-8 text-agri-on-surface-variant opacity-20 mb-2" />
            <p className="text-sm text-agri-on-surface-variant">All tasks completed</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Button variant="outline" className="w-full font-semibold border-agri-outline-variant text-agri-on-surface">
          View All Tasks
        </Button>
      </CardFooter>
    </Card>
  );
}


