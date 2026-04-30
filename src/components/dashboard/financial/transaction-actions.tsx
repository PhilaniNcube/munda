"use client";

import { useState, useTransition } from "react";
import { Upload, Trash2, Loader2, MoreVertical, FileText, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UploadReceiptDialog } from "./upload-receipt-dialog";
import { deleteTransactionAction } from "@/app/actions/transaction";
import { getPresignedViewUrlAction } from "@/app/actions/attachment";

interface TransactionActionsProps {
  transactionId: string;
  description: string;
  attachmentId?: string;
}

export function TransactionActions({ transactionId, description, attachmentId }: TransactionActionsProps) {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isViewing, setIsViewing] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete this transaction: "${description}"?`)) {
      return;
    }

    startTransition(async () => {
      const res = await deleteTransactionAction(transactionId);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleView = async () => {
    if (!attachmentId) return;

    setIsViewing(true);
    try {
      const res = await getPresignedViewUrlAction(attachmentId);
      if (res.success && res.url) {
        window.open(res.url, "_blank");
      } else {
        toast.error(res.message || "Failed to open document");
      }
    } catch (error) {
      toast.error("An error occurred while opening the document");
    } finally {
      setIsViewing(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Mobile-friendly: Use a dropdown for actions to keep the row clean */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="h-8 w-8 text-agri-on-surface-variant">
              <MoreVertical className="h-4 w-4" />
            </Button>
          }
        />

        <DropdownMenuContent align="end" className="max-w-sm w-full">
          {attachmentId && (
            <DropdownMenuItem
              onClick={handleView}
              disabled={isViewing}
              className="cursor-pointer font-medium text-agri-primary focus:text-agri-primary"
            >
              {isViewing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileText className="mr-2 h-4 w-4" />
              )}
              View Document
              <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setIsUploadDialogOpen(true)} className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            {attachmentId ? "Replace Receipt" : "Upload Receipt"}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleDelete}
            className="text-agri-error focus:text-agri-error cursor-pointer"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            Delete Transaction
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UploadReceiptDialog
        transactionId={transactionId}
        description={description}
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
      />
    </div>
  );
}

