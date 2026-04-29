"use client";

import { MoreHorizontal } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CropYieldPoint } from "@/lib/mock-data";

interface CropOverviewChartProps {
  data: CropYieldPoint[];
}

export function CropOverviewChart({ data }: CropOverviewChartProps) {
  return (
    <Card className="elevation-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-h3 text-agri-on-surface">
          Crop Yield Overview
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
            <AreaChart
              data={data}
              margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillWheat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#154212" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#154212" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillMaize" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7d562d" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#7d562d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillSoy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a1d494" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#a1d494" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#c2c9bb"
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#72796e" }}
                tickLine={false}
                axisLine={{ stroke: "#c2c9bb" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#72796e" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}t`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #c2c9bb",
                  borderRadius: "4px",
                  fontSize: "13px",
                  boxShadow: "0 4px 16px rgba(26,28,25,0.06)",
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px", paddingBottom: "8px" }}
              />
              <Area
                type="monotone"
                dataKey="wheat"
                name="Wheat"
                stroke="#154212"
                strokeWidth={2}
                fill="url(#fillWheat)"
                dot={false}
                activeDot={{ r: 4, fill: "#154212" }}
              />
              <Area
                type="monotone"
                dataKey="maize"
                name="Maize"
                stroke="#7d562d"
                strokeWidth={2}
                fill="url(#fillMaize)"
                dot={false}
                activeDot={{ r: 4, fill: "#7d562d" }}
              />
              <Area
                type="monotone"
                dataKey="soy"
                name="Soybean"
                stroke="#a1d494"
                strokeWidth={2}
                fill="url(#fillSoy)"
                dot={false}
                activeDot={{ r: 4, fill: "#a1d494" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
