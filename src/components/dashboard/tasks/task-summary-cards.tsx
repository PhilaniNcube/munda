import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFarmsByUserId } from "@/data/farm/queries";
import { 
  getTasksDueTodayCount, 
  getInProgressTasksCount, 
  getCriticalTasksCount 
} from "@/data/task/queries";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock, PlayCircle, AlertCircle } from "lucide-react";

export async function TaskSummaryCards({ sessionPromise }: { sessionPromise: Promise<any> }) {
  const session = await sessionPromise;

  if (!session?.user?.id) return null;

  const farms = await getFarmsByUserId(session.user.id);
  const farm = farms[0];
  if (!farm) return null;

  const [dueToday, inProgress, critical] = await Promise.all([
    getTasksDueTodayCount(farm.id),
    getInProgressTasksCount(farm.id),
    getCriticalTasksCount(farm.id),
  ]);

  const cards = [
    {
      title: "TASKS DUE TODAY",
      value: dueToday.toString().padStart(2, '0'),
      icon: CalendarClock,
      color: "text-agri-primary",
      bgColor: "bg-agri-primary/10",
      accentColor: "bg-agri-primary",
    },
    {
      title: "IN PROGRESS",
      value: inProgress.toString().padStart(2, '0'),
      icon: PlayCircle,
      color: "text-agri-secondary",
      bgColor: "bg-agri-secondary/10",
      accentColor: "bg-agri-secondary",
    },
    {
      title: "CRITICAL PRIORITY",
      value: critical.toString().padStart(2, '0'),
      icon: AlertCircle,
      color: "text-agri-error",
      bgColor: "bg-agri-error/10",
      accentColor: "bg-agri-error",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="overflow-hidden border-agri-outline-variant shadow-sm relative">
          <div className={`absolute top-0 left-0 w-1 h-full ${card.accentColor}`} />
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold tracking-wider text-agri-on-surface-variant uppercase">
                {card.title}
              </span>
              <span className="text-4xl font-bold text-agri-on-surface">
                {card.value}
              </span>
            </div>
            <div className={`p-3 rounded-xl ${card.bgColor}`}>
              <card.icon className={`h-8 w-8 ${card.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function TaskSummarySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden border-agri-outline-variant shadow-sm animate-pulse">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-24 bg-agri-surface-container rounded" />
              <div className="h-10 w-12 bg-agri-surface-container rounded" />
            </div>
            <div className="p-3 rounded-xl bg-agri-surface-container h-14 w-14" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
