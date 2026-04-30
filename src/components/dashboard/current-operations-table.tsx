import { Wheat, PawPrint, Sprout, Hammer, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFarmsByUserId } from "@/data/farm/queries";
import { getActiveCropsByFarmId } from "@/data/crop/queries";
import { getLivestockByFarmId } from "@/data/livestock/queries";
import { getActiveOperationsByFarmId } from "@/data/task/queries";

const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours} hrs ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
};

export async function CurrentOperationsTable() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) return null;

  const farms = await getFarmsByUserId(session.user.id);
  const farm = farms[0];
  if (!farm) return null;

  const [activeCrops, livestock, activeTasks] = await Promise.all([
    getActiveCropsByFarmId(farm.id),
    getLivestockByFarmId(farm.id),
    getActiveOperationsByFarmId(farm.id),
  ]);

  const operations: any[] = [];

  // Map tasks to operations (Highest priority)
  activeTasks.forEach((task) => {
    operations.push({
      id: `task-${task.id}`,
      resource: task.title,
      location: task.crop ? task.crop.name : (task.livestock ? task.livestock.type : "General"),
      status: "In Progress",
      lastUpdate: formatRelativeTime(task.updatedAt),
      icon: Hammer,
      iconBg: "bg-agri-secondary-container",
      iconColor: "text-agri-on-secondary-container",
      badgeBg: "bg-agri-secondary-container",
      badgeText: "text-agri-on-secondary-container",
      priority: 3,
    });
  });

  // Map crops to operations
  activeCrops.forEach((crop) => {
    operations.push({
      id: `crop-${crop.id}`,
      resource: crop.name,
      location: "Field Area",
      status: crop.status.charAt(0) + crop.status.slice(1).toLowerCase(),
      lastUpdate: formatRelativeTime(crop.updatedAt),
      icon: Sprout,
      iconBg: "bg-agri-primary-container",
      iconColor: "text-agri-on-primary-container",
      badgeBg: crop.status === "GROWING" ? "bg-agri-tertiary-container" : "bg-agri-primary-container",
      badgeText: crop.status === "GROWING" ? "text-agri-on-tertiary-container" : "text-agri-on-primary-container",
      priority: crop.status === "GROWING" ? 2 : 1,
    });
  });

  // Map livestock to operations
  livestock.forEach((animal) => {
    operations.push({
      id: `livestock-${animal.id}`,
      resource: animal.type,
      location: "Main Pasture",
      status: animal.healthStatus || "Healthy",
      lastUpdate: formatRelativeTime(animal.updatedAt),
      icon: PawPrint,
      iconBg: "bg-agri-surface-container-highest",
      iconColor: "text-agri-on-surface",
      badgeBg: "bg-agri-surface-container-highest",
      badgeText: "text-agri-on-surface",
      priority: 1,
    });
  });

  // Sort by priority and then by update time
  const sortedOps = operations.sort((a, b) => b.priority - a.priority);

  // Limit to 5 operations
  const displayOps = sortedOps.slice(0, 5);

  if (displayOps.length === 0) {
    return (
      <Card className="shadow-sm border-agri-outline-variant">
        <CardHeader className="bg-agri-surface-container-lowest border-b border-agri-outline-variant py-4 px-6">
          <CardTitle className="text-lg font-semibold text-agri-on-surface">Current Operations</CardTitle>
        </CardHeader>
        <CardContent className="p-12 text-center">
          <p className="text-agri-on-surface-variant">No active operations found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-agri-outline-variant">
      <CardHeader className="bg-agri-surface-container-lowest border-b border-agri-outline-variant py-4 px-6">
        <CardTitle className="text-lg font-semibold text-agri-on-surface">Current Operations</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b-agri-outline-variant">
              <TableHead className="text-xs font-semibold text-agri-on-surface-variant uppercase px-6 py-4">Resource/Operation</TableHead>
              <TableHead className="text-xs font-semibold text-agri-on-surface-variant uppercase px-6 py-4">Location/Group</TableHead>
              <TableHead className="text-xs font-semibold text-agri-on-surface-variant uppercase px-6 py-4">Status</TableHead>
              <TableHead className="text-xs font-semibold text-agri-on-surface-variant uppercase px-6 py-4">Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayOps.map((op) => (
              <TableRow key={op.id} className="border-b-agri-outline-variant/50 hover:bg-agri-surface-container-low">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${op.iconBg}`}>
                      <op.icon className={`h-4 w-4 ${op.iconColor}`} />
                    </div>
                    <span className="font-medium text-agri-on-surface">{op.resource}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-agri-on-surface-variant font-medium">{op.location}</TableCell>
                <TableCell className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold ${op.badgeBg} ${op.badgeText}`}>
                    {op.status}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-agri-on-surface-variant font-medium">{op.lastUpdate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


