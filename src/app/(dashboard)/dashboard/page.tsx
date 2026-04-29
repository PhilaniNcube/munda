import { MetricTile } from "@/components/dashboard/metric-tile";
import { CropOverviewChart } from "@/components/dashboard/crop-overview-chart";
import { EquipmentStatusChart } from "@/components/dashboard/equipment-status-chart";
import { RecentActivityTable } from "@/components/dashboard/recent-activity-table";
import { WeatherWidget } from "@/components/dashboard/weather-widget";
import {
  metrics,
  cropYieldData,
  equipmentData,
  recentActivity,
  weatherData,
} from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-h1 text-agri-on-surface">Farm Overview</h1>
        <p className="text-body-md text-agri-on-surface-variant mt-1">
          Monitor your farm operations, crop progress, and equipment status at a
          glance.
        </p>
      </div>

      {/* KPI Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricTile key={metric.label} metric={metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CropOverviewChart data={cropYieldData} />
        <EquipmentStatusChart data={equipmentData} />
      </div>

      {/* Bottom Row: Activity Table + Weather */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <RecentActivityTable data={recentActivity} />
        </div>
        <div>
          <WeatherWidget data={weatherData} />
        </div>
      </div>
    </div>
  );
}
