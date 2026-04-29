import {
  Sun,
  Cloud,
  CloudRain,
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { WeatherData } from "@/lib/mock-data";

const conditionIcons: Record<string, React.ElementType> = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  "partly-cloudy": CloudSun,
};

interface WeatherWidgetProps {
  data: WeatherData;
}

export function WeatherWidget({ data }: WeatherWidgetProps) {
  const MainIcon = conditionIcons[data.condition] || CloudSun;

  return (
    <Card className="elevation-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-h3 text-agri-on-surface">
          Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current conditions */}
        <div className="flex items-center gap-4 mb-4">
          <MainIcon className="h-12 w-12 text-agri-secondary stroke-[1.5]" />
          <div>
            <p className="text-h1 text-agri-on-surface leading-none">
              {data.temp}°C
            </p>
            <p className="text-body-md text-agri-on-surface-variant capitalize mt-0.5">
              {data.condition.replace("-", " ")}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-body-md text-agri-on-surface-variant mb-4">
          <span className="flex items-center gap-1.5">
            <Droplets className="h-4 w-4 text-blue-500" />
            {data.humidity}%
          </span>
          <span className="flex items-center gap-1.5">
            <Wind className="h-4 w-4 text-agri-outline" />
            {data.wind} km/h
          </span>
        </div>

        <Separator className="mb-3" />

        {/* 5-day forecast */}
        <div className="grid grid-cols-5 gap-1">
          {data.forecast.map((day) => {
            const DayIcon = conditionIcons[day.condition] || CloudSun;
            return (
              <div
                key={day.day}
                className="flex flex-col items-center gap-1 py-2 rounded hover:bg-agri-surface-container-high transition-colors"
              >
                <span className="text-label-caps text-agri-on-surface-variant">
                  {day.day}
                </span>
                <DayIcon className="h-5 w-5 text-agri-on-surface-variant mt-1" />
                <div className="flex items-center gap-0.5 mt-1">
                  <Thermometer className="h-3 w-3 text-agri-outline" />
                  <span className="text-xs font-medium text-agri-on-surface">
                    {day.high}°
                  </span>
                  <span className="text-xs text-agri-outline">
                    {day.low}°
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
