import { getInventoryByCategory } from "@/data/inventory-item/queries";
import { Wrench } from "lucide-react";

interface ToolsInventoryProps {
  farmIdPromise: Promise<string | null>;
}

export async function ToolsInventory({ farmIdPromise }: ToolsInventoryProps) {
  const farmId = await farmIdPromise;
  if (!farmId) return null;
  const items = await getInventoryByCategory(farmId, "EQUIPMENT");

  return (
    <div className="elevation-1 rounded-lg bg-white h-full flex flex-col">
      <div className="p-6 border-b border-agri-outline-variant/30 flex items-center gap-2">
        <Wrench className="h-5 w-5 text-agri-primary" />
        <h2 className="text-h3 text-agri-on-surface">Tools & Equipment</h2>
      </div>

      <div className="p-6 grid gap-4 grid-cols-2">
        {items.length === 0 ? (
          <div className="col-span-2 py-8 text-center text-agri-on-surface-variant opacity-60 italic">
            No equipment records found.
          </div>
        ) : (
          items.slice(0, 2).map((item) => (
            <div key={item.id} className="p-4 border border-agri-outline-variant/30 rounded-lg space-y-3">
              <p className="text-[11px] font-bold text-agri-on-surface-variant uppercase tracking-wider">
                {item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name}
              </p>
              <div className="flex items-end justify-between">
                <p className="text-[32px] font-bold text-agri-on-surface leading-none">
                  {item.quantity}
                </p>
                <p className="text-[11px] font-bold text-agri-on-surface-variant uppercase mb-1">
                  In Stock
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
