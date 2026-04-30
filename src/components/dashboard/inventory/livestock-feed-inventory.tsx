import { getInventoryByCategory } from "@/data/inventory-item/queries";
import { Wheat, Droplet } from "lucide-react";

interface LivestockFeedInventoryProps {
  farmIdPromise: Promise<string | null>;
}

export async function LivestockFeedInventory({ farmIdPromise }: LivestockFeedInventoryProps) {
  const farmId = await farmIdPromise;
  if (!farmId) return null;
  const items = await getInventoryByCategory(farmId, "FEED");

  return (
    <div className="elevation-1 rounded-lg bg-white h-full flex flex-col">
      <div className="p-6 border-b border-agri-outline-variant/30 flex items-center gap-2">
        <Wheat className="h-5 w-5 text-agri-primary" />
        <h2 className="text-h3 text-agri-on-surface">Livestock Feed</h2>
      </div>

      <div className="p-6 space-y-4">
        {items.length === 0 ? (
          <p className="text-center text-agri-on-surface-variant opacity-60 italic">
            No feed records found.
          </p>
        ) : (
          items.map((item, idx) => {
            const Icon = idx % 2 === 0 ? Wheat : Droplet;
            const status = item.quantity > 50 ? "Good" : "Order Soon";
            const statusColor = status === "Good" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800";

            return (
              <div key={item.id} className="flex items-center gap-4 py-2 border-b border-agri-outline-variant/10 last:border-0">
                <div className="h-12 w-12 rounded bg-agri-surface-container flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-agri-on-surface-variant" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body-md font-bold text-agri-on-surface truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-agri-on-surface-variant uppercase tracking-wider">
                    Storage Area
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-body-md font-bold text-agri-on-surface">
                    {item.quantity} {item.unit}
                  </p>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${statusColor}`}>
                    {status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
