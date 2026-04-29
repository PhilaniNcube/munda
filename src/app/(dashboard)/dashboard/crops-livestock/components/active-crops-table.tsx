import { Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFarmsByUserId } from "@/data/farm/queries";
import { getActiveCropsByFarmId } from "@/data/crop/queries";
import { CropStatus } from "@prisma/client";

const formatDate = (date: Date | null) => {
  if (!date) return "-";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const getStatusBadgeClasses = (status: CropStatus) => {
  switch (status) {
    case "GROWING":
      return "bg-agri-tertiary-container text-agri-on-tertiary-container border-transparent rounded";
    case "PLANNED":
      return "bg-agri-primary-container text-agri-on-primary-container border-transparent rounded";
    case "HARVESTED":
      return "bg-agri-secondary-container text-agri-on-secondary-container border-transparent rounded";
    case "FAILED":
      return "bg-agri-error-container text-agri-on-error-container border-transparent rounded";
    default:
      return "rounded";
  }
};

const formatStatus = (status: string) => {
  return status.charAt(0) + status.slice(1).toLowerCase();
};

export async function ActiveCropsTable() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return null;
  }

  // Get the user's farm
  const farms = await getFarmsByUserId(session.user.id);
  const farm = farms[0]; // Assuming first farm for now

  if (!farm) {
    return (
      <Card className="rounded-lg shadow-sm border-agri-outline-variant p-12 text-center">
        <p className="text-agri-on-surface-variant">No farm associated with your profile.</p>
      </Card>
    );
  }

  const activeCrops = await getActiveCropsByFarmId(farm.id);

  if (activeCrops.length === 0) {
    return (
      <Card className="rounded-lg shadow-sm border-agri-outline-variant overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-6 bg-agri-surface-container-lowest border-b border-agri-outline-variant">
          <h2 className="text-h2 text-agri-on-surface">Active Crops</h2>
        </div>
        <div className="p-12 text-center">
          <p className="text-agri-on-surface-variant">No active crops found for {farm.name}.</p>
        </div>
      </Card>
    );
  }



  return (
    <Card className="rounded-lg shadow-sm border-agri-outline-variant overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-6 bg-agri-surface-container-lowest border-b border-agri-outline-variant">
        <h2 className="text-h2 text-agri-on-surface">Active Crops</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search crops..."
            className="pl-9 bg-agri-surface-container-lowest border-agri-outline-variant h-9"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="table-zebra">
          <TableHeader>
            <TableRow className="border-b border-agri-outline-variant hover:bg-transparent">
              <TableHead className="text-label-caps text-agri-on-surface-variant font-bold h-12">CROP NAME</TableHead>
              <TableHead className="text-label-caps text-agri-on-surface-variant font-bold h-12">VARIETY</TableHead>
              <TableHead className="text-label-caps text-agri-on-surface-variant font-bold h-12">PLANTING DATE</TableHead>
              <TableHead className="text-label-caps text-agri-on-surface-variant font-bold h-12">EST. HARVEST</TableHead>
              <TableHead className="text-label-caps text-agri-on-surface-variant font-bold h-12">STATUS</TableHead>
              <TableHead className="text-label-caps text-agri-on-surface-variant font-bold h-12 text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeCrops.map((crop) => (
              <TableRow key={crop.id} className="border-b border-agri-outline-variant/50 transition-colors">
                <TableCell className="font-semibold text-agri-on-surface text-data-table py-4">{crop.name}</TableCell>
                <TableCell className="text-agri-on-surface-variant text-data-table py-4">{crop.variety || "-"}</TableCell>
                <TableCell className="text-agri-on-surface-variant text-data-table py-4">{formatDate(crop.plantingDate)}</TableCell>
                <TableCell className="text-agri-on-surface-variant text-data-table py-4">{formatDate(crop.expectedHarvestDate)}</TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="outline"
                    className={getStatusBadgeClasses(crop.status)}
                  >
                    {formatStatus(crop.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4">
                  <Button variant="ghost" size="icon-sm" className="text-agri-on-surface-variant hover:text-agri-on-surface">
                    <MoreVertical className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between p-4 bg-agri-surface-container-lowest border-t border-agri-outline-variant">
        <p className="text-body-md text-agri-on-surface-variant">
          Showing {activeCrops.length} crops
        </p>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" className="text-agri-on-surface-variant" disabled>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-agri-on-surface-variant" disabled>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
