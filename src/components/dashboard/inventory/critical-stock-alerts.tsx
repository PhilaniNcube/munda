import { getCriticalStockAlerts } from "@/data/inventory-item/queries";
import { AlertTriangle, ShoppingCart } from "lucide-react";

interface CriticalStockAlertsProps {
  farmIdPromise: Promise<string | null>;
}

export async function CriticalStockAlerts({ farmIdPromise }: CriticalStockAlertsProps) {
  const farmId = await farmIdPromise;
  if (!farmId) return null;
  const alerts = await getCriticalStockAlerts(farmId);

  if (alerts.length === 0) return null;

  return (
    <div className="elevation-1 bg-agri-error-container/10 border-agri-error-container/30 p-6 rounded-lg relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-agri-error" />
        <h2 className="text-h3 text-agri-on-error-container font-bold">Critical Stock Alerts</h2>
      </div>
      
      {/* Decorative background icon */}
      <AlertTriangle className="absolute -right-4 -top-4 h-32 w-32 text-agri-error/10 rotate-12" />

      <div className="grid gap-4 md:grid-cols-3 relative z-10">
        {alerts.map((item) => (
          <div 
            key={item.id} 
            className="bg-white border border-agri-error/20 p-4 rounded-lg flex items-center justify-between"
          >
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-agri-error uppercase tracking-wider">
                {item.name}
              </p>
              <p className="text-h2 text-agri-on-surface">
                {item.quantity} <span className="text-body-md font-normal">{item.unit}</span>
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-agri-error-container/20 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-agri-error" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
