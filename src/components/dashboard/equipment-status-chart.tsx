"use client";

import { MoreHorizontal } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EquipmentItem } from "@/lib/mock-data";

interface EquipmentStatusChartProps {
  data: EquipmentItem[];
}

const statusColors: Record<string, string> = {
  online: "#154212",
  maintenance: "#7d562d",
  offline: "#ba1a1a",
};

export function EquipmentStatusChart({ data }: EquipmentStatusChartProps) {
  return (
    <Card className="elevation-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-h3 text-agri-on-surface">
          Equipment Utilization
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-agri-outline hover:text-agri-on-surface"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#c2c9bb"
                strokeOpacity={0.5}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#72796e" }}
                tickLine={false}
                axisLine={{ stroke: "#c2c9bb" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: "#72796e" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #c2c9bb",
                  borderRadius: "4px",
                  fontSize: "13px",
                  boxShadow: "0 4px 16px rgba(26,28,25,0.06)",
                }}
                formatter={(value) => [`${value}%`, "Utilization"]}
              />
              <Bar dataKey="utilization" radius={[3, 3, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={statusColors[entry.status]}
                    opacity={entry.status === "offline" ? 0.5 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="mt-3 flex items-center gap-4 text-body-md text-agri-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-agri-primary" />
            Online
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-agri-secondary" />
            Maintenance
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-agri-error opacity-50" />
            Offline
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
