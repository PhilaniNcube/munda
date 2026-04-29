import { Wheat, Bug, PawPrint } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const operations = [
  {
    id: 1,
    resource: "Corn",
    location: "East Field 2",
    status: "Harvesting Soon",
    lastUpdate: "2 hrs ago",
    icon: Wheat,
    iconBg: "bg-[#e5ead8]",
    iconColor: "text-[#4d5240]",
    badgeBg: "bg-[#f4caa3]",
    badgeText: "text-[#7d562d]",
  },
  {
    id: 2,
    resource: "Soybeans",
    location: "West Valley",
    status: "Growing - Week 6",
    lastUpdate: "Yesterday",
    icon: Bug,
    iconBg: "bg-[#e5ead8]",
    iconColor: "text-[#4d5240]",
    badgeBg: "bg-gray-200",
    badgeText: "text-gray-800",
  },
  {
    id: 3,
    resource: "Cattle",
    location: "Main Pasture",
    status: "All Healthy",
    lastUpdate: "Today, 8:00 AM",
    icon: PawPrint,
    iconBg: "bg-[#b1e3ab]",
    iconColor: "text-[#154212]",
    badgeBg: "bg-[#a1d494]",
    badgeText: "text-[#154212]",
  },
];

export function CurrentOperationsTable() {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="bg-gray-50/50 border-b border-gray-100 py-4 px-6">
        <CardTitle className="text-lg font-semibold text-gray-900">Current Operations</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b-gray-200">
              <TableHead className="text-xs font-semibold text-gray-500 uppercase px-6 py-4">Resource</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase px-6 py-4">Location/Group</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase px-6 py-4">Status</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase px-6 py-4">Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operations.map((op) => (
              <TableRow key={op.id} className="border-b-gray-100 hover:bg-gray-50/50">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${op.iconBg}`}>
                      <op.icon className={`h-4 w-4 ${op.iconColor}`} />
                    </div>
                    <span className="font-medium text-gray-900">{op.resource}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 font-medium">{op.location}</TableCell>
                <TableCell className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold ${op.badgeBg} ${op.badgeText}`}>
                    {op.status}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 font-medium">{op.lastUpdate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
