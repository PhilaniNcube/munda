import { getInventoryByCategory } from "@/data/inventory-item/queries";
import { FlaskConical } from "lucide-react";

interface FertilizersInventoryProps {
  farmIdPromise: Promise<string | null>;
}

export async function FertilizersInventory({ farmIdPromise }: FertilizersInventoryProps) {
  const farmId = await farmIdPromise;
  if (!farmId) return null;
  const items = await getInventoryByCategory(farmId, "FERTILIZER");

  return (
    <div className="elevation-1 rounded-lg bg-white h-full flex flex-col">
      <div className="p-6 border-b border-agri-outline-variant/30 flex items-center gap-2">
        <FlaskConical className="h-5 w-5 text-agri-primary" />
        <h2 className="text-h3 text-agri-on-surface">Fertilizers</h2>
      </div>

      <div className="p-6 space-y-6">
        {items.length === 0 ? (
          <p className="text-center text-agri-on-surface-variant opacity-60 italic">
            No fertilizer records found.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-md font-bold text-agri-on-surface">{item.name}</p>
                  <p className="text-[11px] text-agri-on-surface-variant uppercase tracking-wider">Granular</p>
                </div>
                <div className="text-right">
                  <p className={`text-body-md font-bold ${item.quantity < 50 ? "text-agri-error" : "text-agri-on-surface"}`}>
                    {item.quantity} {item.unit}
                  </p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-agri-surface-container rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${item.quantity < 50 ? "bg-agri-error" : "bg-agri-primary"}`}
                  style={{ width: `${Math.min((item.quantity / 200) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-end">
                <div className={`h-2 w-2 rounded-full ${item.quantity < 50 ? "bg-agri-error" : "bg-agri-on-primary-container"}`} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
