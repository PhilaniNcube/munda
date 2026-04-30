import { getInventoryByCategory } from "@/data/inventory-item/queries";
import { Sprout } from "lucide-react";

interface SeedsInventoryProps {
  farmIdPromise: Promise<string | null>;
}

export async function SeedsInventory({ farmIdPromise }: SeedsInventoryProps) {
  const farmId = await farmIdPromise;
  if (!farmId) return null;
  const items = await getInventoryByCategory(farmId, "SEEDS");

  return (
    <div className="elevation-1 rounded-lg overflow-hidden flex flex-col h-full bg-white">
      <div className="p-6 border-b border-agri-outline-variant/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sprout className="h-5 w-5 text-agri-primary" />
          <h2 className="text-h3 text-agri-on-surface">Seeds</h2>
        </div>
        <button className="text-body-md text-agri-on-surface-variant hover:text-agri-primary font-medium">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left table-zebra">
          <thead>
            <tr className="text-label-caps text-agri-on-surface-variant border-b border-agri-outline-variant/30">
              <th className="px-6 py-4 font-bold">Item</th>
              <th className="px-6 py-4 font-bold">Variety</th>
              <th className="px-6 py-4 font-bold">Stock</th>
              <th className="px-6 py-4 font-bold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-data-table">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-agri-on-surface-variant opacity-60 italic">
                  No seed records found.
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const status = item.quantity > 100 ? "Sufficient" : item.quantity > 50 ? "Monitor" : "Low Stock";
                const statusColor = 
                  status === "Sufficient" ? "bg-green-100 text-green-800" : 
                  status === "Monitor" ? "bg-amber-100 text-amber-800" : 
                  "bg-red-100 text-red-800";

                return (
                  <tr key={item.id} className="border-b border-agri-outline-variant/10 last:border-0">
                    <td className="px-6 py-4 font-semibold text-agri-on-surface">{item.name}</td>
                    <td className="px-6 py-4 text-agri-on-surface-variant">Default Variety</td>
                    <td className="px-6 py-4 text-agri-on-surface">
                      <span className={item.quantity < 50 ? "text-agri-error font-bold" : ""}>
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase ${statusColor}`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
