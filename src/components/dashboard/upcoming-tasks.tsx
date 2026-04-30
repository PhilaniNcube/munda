import { MoreHorizontal, Clock, CalendarDays, AlertTriangle, Sprout } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFarmsByUserId } from "@/data/farm/queries";
import { getCriticalStockAlerts } from "@/data/inventory-item/queries";
import { getActiveCropsByFarmId } from "@/data/crop/queries";

export async function UpcomingTasks() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) return null;

  const farms = await getFarmsByUserId(session.user.id);
  const farm = farms[0];
  if (!farm) return null;

  const [stockAlerts, activeCrops] = await Promise.all([
    getCriticalStockAlerts(farm.id),
    getActiveCropsByFarmId(farm.id),
  ]);

  const tasks: any[] = [];

  // Map stock alerts to tasks
  stockAlerts.forEach((item) => {
    tasks.push({
      id: `stock-${item.id}`,
      title: `Restock ${item.name}`,
      time: `${item.quantity} ${item.unit} remaining`,
      icon: AlertTriangle,
      iconColor: "text-agri-error",
      borderColor: "border-agri-error",
    });
  });

  // Map planned crops to tasks
  activeCrops.filter(c => c.status === "PLANNED").forEach((crop) => {
    tasks.push({
      id: `crop-${crop.id}`,
      title: `Prepare for ${crop.name} planting`,
      time: crop.plantingDate ? `Due ${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(crop.plantingDate)}` : "TBD",
      icon: Sprout,
      iconColor: "text-agri-primary",
      borderColor: "border-agri-primary",
    });
  });

  // If no tasks, add a placeholder
  if (tasks.length === 0) {
    tasks.push({
      id: "no-tasks",
      title: "No urgent tasks",
      time: "All clear",
      icon: CalendarDays,
      iconColor: "text-agri-on-surface-variant",
      borderColor: "border-agri-outline-variant",
    });
  }

  // Limit to 3 tasks
  const displayTasks = tasks.slice(0, 3);

  return (
    <Card className="shadow-sm border-agri-outline-variant flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-agri-on-surface">Upcoming Tasks</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-agri-on-surface-variant">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        {displayTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-start gap-3 p-3 bg-agri-surface-container-low rounded-md border-l-4 ${task.borderColor}`}
          >
            <div className="pt-0.5">
              <task.icon className={`h-4 w-4 ${task.iconColor}`} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-agri-on-surface">{task.title}</span>
              <div className="flex items-center gap-1.5 text-xs text-agri-on-surface-variant">
                <span>{task.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Button variant="outline" className="w-full font-semibold border-agri-outline-variant text-agri-on-surface">
          View All Tasks
        </Button>
      </CardFooter>
    </Card>
  );
}

