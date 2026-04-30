import { Button } from "@/components/ui/button";
import { Filter, FileUp } from "lucide-react";
import { AddInventoryDialog } from "./add-inventory-dialog";

export function InventoryHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-h1 text-agri-on-surface">Inventory & Supplies</h1>
        <p className="text-body-md text-agri-on-surface-variant">
          Manage and monitor your farm&apos;s essential resources.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <AddInventoryDialog />
        <Button variant="outline" size="sm" className="h-10 gap-2 border-agri-outline-variant text-agri-on-surface">
          <Filter className="h-4 w-4" />
          FILTER
        </Button>
        <Button variant="outline" size="sm" className="h-10 gap-2 border-agri-outline-variant text-agri-on-surface">
          <FileUp className="h-4 w-4" />
          EXPORT
        </Button>
      </div>
    </div>
  );
}
