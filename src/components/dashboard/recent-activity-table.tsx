import { MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FieldStatusChip } from "./field-status-chip";
import type { ActivityEntry } from "@/lib/mock-data";

interface RecentActivityTableProps {
  data: ActivityEntry[];
}

export function RecentActivityTable({ data }: RecentActivityTableProps) {
  return (
    <Card className="elevation-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-h3 text-agri-on-surface">
          Recent Activity
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
      <CardContent className="pt-0 px-0">
        <div className="table-zebra overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-agri-outline-variant hover:bg-transparent">
                <TableHead className="text-label-caps text-agri-on-surface-variant h-10 pl-6">
                  Date
                </TableHead>
                <TableHead className="text-label-caps text-agri-on-surface-variant h-10">
                  Field
                </TableHead>
                <TableHead className="text-label-caps text-agri-on-surface-variant h-10">
                  Activity
                </TableHead>
                <TableHead className="text-label-caps text-agri-on-surface-variant h-10">
                  Status
                </TableHead>
                <TableHead className="text-label-caps text-agri-on-surface-variant h-10 pr-6">
                  Operator
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry) => (
                <TableRow
                  key={entry.id}
                  className="border-b border-agri-outline-variant/30 transition-colors cursor-pointer"
                >
                  <TableCell className="text-data-table text-agri-on-surface-variant pl-6 whitespace-nowrap">
                    {new Date(entry.date).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell className="text-data-table text-agri-on-surface font-medium whitespace-nowrap">
                    {entry.field}
                  </TableCell>
                  <TableCell className="text-data-table text-agri-on-surface-variant max-w-[300px] truncate">
                    {entry.activity}
                  </TableCell>
                  <TableCell>
                    <FieldStatusChip status={entry.status} />
                  </TableCell>
                  <TableCell className="text-data-table text-agri-on-surface-variant pr-6 whitespace-nowrap">
                    {entry.operator}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
