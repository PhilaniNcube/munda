import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddCropDialog } from "./add-crop-dialog";
import { AddLivestockDialog } from "./add-livestock-dialog";

export function PageHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-h1 mb-1">Crops & Livestock Management</h1>
        <p className="text-body-md text-muted-foreground">
          Monitor planting schedules, harvest estimates, and herd health.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="border-agri-secondary text-agri-secondary hover:bg-agri-secondary hover:text-white">
          <Printer className="mr-2 size-4" />
          Export Report
        </Button>
        <AddCropDialog />
        <AddLivestockDialog />
      </div>
    </div>
  );
}
