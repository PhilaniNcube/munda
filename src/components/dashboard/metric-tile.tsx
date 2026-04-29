"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import type { MetricData } from "@/lib/mock-data";

interface MetricTileProps {
  metric: MetricData;
}

export function MetricTile({ metric }: MetricTileProps) {
  const isPositive = metric.trend >= 0;
  const sparkData = metric.sparkline.map((v, i) => ({ idx: i, value: v }));

  return (
    <Card className="elevation-1 overflow-hidden transition-shadow hover:shadow-md group">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          {/* Left side: label + value */}
          <div className="flex-1 min-w-0">
            <p className="text-label-caps text-agri-on-surface-variant mb-2">
              {metric.label}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-h1 text-agri-on-surface leading-none">
                {metric.value}
              </span>
              {metric.unit && (
                <span className="text-body-md text-agri-on-surface-variant">
                  {metric.unit}
                </span>
              )}
            </div>
            <div
              className={`mt-2 flex items-center gap-1 text-status-badge ${
                isPositive ? "text-agri-primary" : "text-agri-error"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              <span>
                {isPositive ? "+" : ""}
                {metric.trend}%
              </span>
              <span className="text-agri-on-surface-variant ml-0.5">
                vs last month
              </span>
            </div>
          </div>

          {/* Sparkline */}
          <div className="w-24 h-12 opacity-60 group-hover:opacity-100 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient
                    id={`spark-${metric.label}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={isPositive ? "#154212" : "#ba1a1a"}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor={isPositive ? "#154212" : "#ba1a1a"}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "#154212" : "#ba1a1a"}
                  strokeWidth={1.5}
                  fill={`url(#spark-${metric.label})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
