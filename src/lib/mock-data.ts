// ── Mock Data for Agri-Management Dashboard ──

export interface MetricData {
  label: string;
  value: string;
  unit?: string;
  trend: number; // percentage, positive = up
  sparkline: number[];
}

export interface CropYieldPoint {
  month: string;
  wheat: number;
  maize: number;
  soy: number;
}

export interface EquipmentItem {
  name: string;
  utilization: number; // 0-100
  status: "online" | "maintenance" | "offline";
}

export interface ActivityEntry {
  id: string;
  date: string;
  field: string;
  activity: string;
  status: "planted" | "irrigating" | "harvested" | "alert" | "scheduled";
  operator: string;
}

export interface WeatherData {
  temp: number;
  humidity: number;
  wind: number;
  condition: "sunny" | "cloudy" | "rainy" | "partly-cloudy";
  forecast: { day: string; high: number; low: number; condition: string }[];
}

// ── KPI Metrics ──
export const metrics: MetricData[] = [
  {
    label: "Total Yield",
    value: "2,847",
    unit: "tonnes",
    trend: 12.5,
    sparkline: [40, 45, 42, 50, 55, 58, 62, 60, 68, 72, 75, 80],
  },
  {
    label: "Active Fields",
    value: "24",
    unit: "of 32",
    trend: 4.2,
    sparkline: [18, 19, 20, 20, 21, 22, 22, 23, 23, 24, 24, 24],
  },
  {
    label: "Equipment Online",
    value: "18",
    unit: "of 22",
    trend: -2.1,
    sparkline: [20, 19, 20, 18, 19, 17, 18, 19, 18, 18, 18, 18],
  },
  {
    label: "Tasks Due",
    value: "7",
    unit: "this week",
    trend: -15.0,
    sparkline: [12, 10, 14, 11, 9, 8, 10, 12, 9, 8, 7, 7],
  },
];

// ── Crop Yield (12 months) ──
export const cropYieldData: CropYieldPoint[] = [
  { month: "Jan", wheat: 120, maize: 80, soy: 60 },
  { month: "Feb", wheat: 110, maize: 90, soy: 65 },
  { month: "Mar", wheat: 140, maize: 100, soy: 70 },
  { month: "Apr", wheat: 160, maize: 130, soy: 85 },
  { month: "May", wheat: 200, maize: 160, soy: 110 },
  { month: "Jun", wheat: 250, maize: 210, soy: 140 },
  { month: "Jul", wheat: 280, maize: 240, soy: 160 },
  { month: "Aug", wheat: 310, maize: 260, soy: 175 },
  { month: "Sep", wheat: 290, maize: 230, soy: 155 },
  { month: "Oct", wheat: 240, maize: 180, soy: 120 },
  { month: "Nov", wheat: 180, maize: 140, soy: 90 },
  { month: "Dec", wheat: 150, maize: 110, soy: 75 },
];

// ── Equipment ──
export const equipmentData: EquipmentItem[] = [
  { name: "Tractor A1", utilization: 87, status: "online" },
  { name: "Harvester H2", utilization: 72, status: "online" },
  { name: "Irrigator I3", utilization: 95, status: "online" },
  { name: "Sprayer S1", utilization: 45, status: "maintenance" },
  { name: "Tractor A2", utilization: 63, status: "online" },
  { name: "Drone D1", utilization: 38, status: "online" },
  { name: "Seeder E1", utilization: 0, status: "offline" },
  { name: "Harvester H1", utilization: 81, status: "online" },
];

// ── Recent Activity ──
export const recentActivity: ActivityEntry[] = [
  {
    id: "ACT-001",
    date: "2026-04-28",
    field: "North Paddock A",
    activity: "Wheat planting completed",
    status: "planted",
    operator: "J. van der Merwe",
  },
  {
    id: "ACT-002",
    date: "2026-04-28",
    field: "South Pivot B",
    activity: "Centre-pivot irrigation cycle",
    status: "irrigating",
    operator: "System Auto",
  },
  {
    id: "ACT-003",
    date: "2026-04-27",
    field: "East Block C",
    activity: "Maize harvest — 42 tonnes loaded",
    status: "harvested",
    operator: "P. Nkosi",
  },
  {
    id: "ACT-004",
    date: "2026-04-27",
    field: "Dam Sector 2",
    activity: "Water level critically low",
    status: "alert",
    operator: "Sensor Alert",
  },
  {
    id: "ACT-005",
    date: "2026-04-26",
    field: "West Field D",
    activity: "Soil analysis sampling",
    status: "scheduled",
    operator: "M. Botha",
  },
  {
    id: "ACT-006",
    date: "2026-04-26",
    field: "North Paddock B",
    activity: "Fertiliser application — NPK 3:2:1",
    status: "planted",
    operator: "J. van der Merwe",
  },
  {
    id: "ACT-007",
    date: "2026-04-25",
    field: "South Pivot A",
    activity: "Soybean planting — row 1-24",
    status: "planted",
    operator: "T. Molefe",
  },
  {
    id: "ACT-008",
    date: "2026-04-25",
    field: "Equipment Yard",
    activity: "Sprayer S1 — scheduled maintenance",
    status: "scheduled",
    operator: "Workshop",
  },
  {
    id: "ACT-009",
    date: "2026-04-24",
    field: "East Block A",
    activity: "Wheat harvest — 68 tonnes loaded",
    status: "harvested",
    operator: "P. Nkosi",
  },
  {
    id: "ACT-010",
    date: "2026-04-24",
    field: "Orchard Section 1",
    activity: "Pest monitoring — aphid count elevated",
    status: "alert",
    operator: "Drone D1",
  },
];

// ── Weather ──
export const weatherData: WeatherData = {
  temp: 24,
  humidity: 55,
  wind: 12,
  condition: "partly-cloudy",
  forecast: [
    { day: "Tue", high: 26, low: 14, condition: "sunny" },
    { day: "Wed", high: 23, low: 13, condition: "cloudy" },
    { day: "Thu", high: 19, low: 10, condition: "rainy" },
    { day: "Fri", high: 22, low: 12, condition: "partly-cloudy" },
    { day: "Sat", high: 25, low: 14, condition: "sunny" },
  ],
};
