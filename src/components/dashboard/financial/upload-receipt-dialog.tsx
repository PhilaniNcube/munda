"use client";

import { useState } from "react";
import { Upload, Loader2, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getPresignedUploadUrlAction, saveAttachmentAction } from "@/app/actions/attachment";

interface UploadReceiptDialogProps {
  transactionId: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadReceiptDialog({
  transactionId,
  description,
  open,
  onOpenChange,
}: UploadReceiptDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);
    setProgress(10);

    try {
      console.log("Starting upload for file:", file.name, "type:", file.type);
      
      // 1. Get pre-signed URL
      const res = await getPresignedUploadUrlAction(file.name, file.type, transactionId);
      
      if (!res.success || !res.url) {
        console.error("Server failed to provide pre-signed URL:", res);
        throw new Error(res.message || "Failed to get upload URL");
      }

      console.log("Received pre-signed URL. Proceeding with PUT request...");
      setProgress(30);

      // 2. Upload to R2
      const uploadRes = await fetch(res.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        console.error("Upload to R2 failed with status:", uploadRes.status, errorText);
        throw new Error(`Upload failed (${uploadRes.status}): ${errorText || "Unknown error"}`);
      }

      console.log("Upload to R2 successful. Saving attachment record to DB...");
      setProgress(70);

      // 3. Save to DB
      const saveRes = await saveAttachmentAction({
        url: res.publicUrl || "",
        name: file.name,
        fileType: file.type,
        transactionId,
      });

      if (!saveRes.success) {
        console.error("Failed to save attachment to DB:", saveRes);
        throw new Error(saveRes.message || "Failed to save attachment info");
      }

      console.log("Process complete! Attachment saved.");
      setProgress(100);
      toast.success("Receipt uploaded successfully");
      
      setTimeout(() => {
        onOpenChange(false);
        setFile(null);
        setProgress(0);
        setIsUploading(false);
      }, 500);

    } catch (error: any) {
      console.error("Detailed upload error:", error);
      toast.error(error.message || "An error occurred during upload");
      setIsUploading(false);
      setProgress(0);
    }

  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isUploading && onOpenChange(val)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Receipt</DialogTitle>
          <DialogDescription>
            Upload a receipt, invoice, or document for: <br />
            <span className="font-semibold text-agri-on-surface">{description}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="receipt">File</Label>
            <div className="relative">
              <Input
                id="receipt"
                type="file"
                className="cursor-pointer"
                onChange={handleFileChange}
                disabled={isUploading}
                accept="image/*,application/pdf"
              />
              {file && !isUploading && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                  onClick={() => setFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <p className="text-[0.8rem] text-agri-on-surface-variant">
              Supported formats: Images (JPG, PNG), PDF. Max 10MB.
            </p>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="bg-agri-primary text-white hover:bg-agri-primary/90"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
