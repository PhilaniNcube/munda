"use client";

import { useActionState, useEffect, useState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { InventoryCategory } from "@prisma/client";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addInventoryItemAction } from "@/app/actions/inventory";

const formSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  category: zod.nativeEnum(InventoryCategory),
  quantity: zod.string().min(1, "Quantity is required"),
  unit: zod.string().min(1, "Unit is required"),
});

type FormValues = zod.infer<typeof formSchema>;

export function AddInventoryDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(addInventoryItemAction, null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: InventoryCategory.OTHER,
      quantity: "",
      unit: "",
    },
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Item added successfully");
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
        formData.append(key, value);
      });
      formAction(formData);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="bg-agri-primary text-white hover:bg-agri-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        }
      />


      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Inventory Item</DialogTitle>
          <DialogDescription>
            Add a new item to your farm inventory.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Corn Seed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={InventoryCategory.SEEDS}>Seeds</SelectItem>
                      <SelectItem value={InventoryCategory.FERTILIZER}>Fertilizer</SelectItem>
                      <SelectItem value={InventoryCategory.EQUIPMENT}>Equipment</SelectItem>
                      <SelectItem value={InventoryCategory.FEED}>Feed</SelectItem>
                      <SelectItem value={InventoryCategory.OTHER}>Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Bags, Gal" {...field} />
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
              <Button
                type="submit"
                disabled={isPending}
                className="bg-agri-primary text-white hover:bg-agri-primary/90 min-w-[140px]"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Item"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
