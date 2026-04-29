import { MoreHorizontal, Clock, CalendarDays } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tasks = [
  {
    id: 1,
    title: "Fertilize North Field",
    time: "Today, 2:00 PM",
    isTime: true,
    borderColor: "border-[#154212]", // dark green
  },
  {
    id: 2,
    title: "Order Feed for Cattle",
    time: "Tomorrow",
    isTime: true,
    borderColor: "border-[#7d562d]", // brown
  },
  {
    id: 3,
    title: "Equipment Maintenance Check",
    time: "Oct 15",
    isTime: false,
    borderColor: "border-gray-300", // light gray
  },
];

export function UpcomingTasks() {
  return (
    <Card className="shadow-sm border-gray-200 flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">Upcoming Tasks</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-start gap-3 p-3 bg-[#f5f7f5] rounded-md border-l-4 ${task.borderColor}`}
          >
            <div className="pt-0.5">
              <div className="h-4 w-4 rounded-sm border border-gray-400 bg-white" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-900">{task.title}</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                {task.isTime ? (
                  <Clock className="h-3.5 w-3.5" />
                ) : (
                  <CalendarDays className="h-3.5 w-3.5" />
                )}
                <span>{task.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Button variant="outline" className="w-full font-semibold border-gray-200 text-gray-800">
          View All Tasks
        </Button>
      </CardFooter>
    </Card>
  );
}
