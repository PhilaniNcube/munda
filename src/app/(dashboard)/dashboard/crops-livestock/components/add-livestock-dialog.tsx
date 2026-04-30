"use client";

import { useActionState, useEffect, useState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addLivestockAction } from "@/app/actions/livestock";

const formSchema = z.object({
  type: z.string().min(1, "Livestock type is required"),
  breed: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be at least 0"),
  healthStatus: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddLivestockDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(addLivestockAction, null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      breed: "",
      quantity: 0,
      healthStatus: "Healthy",
    },
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Livestock added successfully");
      setOpen(false);
      form.reset();
    } else if (state?.errors) {
      if ("root" in state.errors && state.errors.root) {
        toast.error((state.errors.root as string[])[0]);
      }
    } else if (state?.message && !state?.success) {
      toast.error(state.message);
    }
  }, [state, form]);

  const onSubmit = (data: FormValues) => {
    startTransition(() => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value.toString());
        }
      });
      formAction(formData);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" className="border-agri-primary text-agri-primary hover:bg-agri-primary hover:text-white" />}>
        <Plus className="mr-2 size-4" />
        Add New Livestock
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Livestock</DialogTitle>
          <DialogDescription>
            Enter the details for the new livestock record. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Livestock Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Cattle, Poultry, Pigs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Holstein, Rhode Island Red" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="healthStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health Status</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Healthy, Under Treatment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="bg-agri-primary text-white hover:bg-agri-primary/90">
                {isPending ? "Saving..." : "Save Livestock"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
