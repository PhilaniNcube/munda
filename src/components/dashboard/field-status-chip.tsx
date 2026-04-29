import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type FieldStatus = "planted" | "irrigating" | "harvested" | "alert" | "scheduled";

const statusConfig: Record<
  FieldStatus,
  { label: string; className: string }
> = {
  planted: {
    label: "Planted",
    className: "bg-agri-primary text-agri-on-primary",
  },
  irrigating: {
    label: "Irrigating",
    className: "bg-blue-600 text-white",
  },
  harvested: {
    label: "Harvested",
    className: "bg-agri-secondary-container text-agri-on-secondary-container",
  },
  alert: {
    label: "Alert",
    className: "bg-agri-error-container text-agri-on-error-container",
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-agri-surface-container-high text-agri-on-surface-variant",
  },
};

interface FieldStatusChipProps {
  status: FieldStatus;
  className?: string;
}

export function FieldStatusChip({ status, className }: FieldStatusChipProps) {
  const config = statusConfig[status];
  return (
    <Badge
      variant="default"
      className={cn(
        "text-status-badge rounded-sm px-2 py-0.5 font-semibold border-0 shadow-none",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
