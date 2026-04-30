import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFarmsByUserId } from "@/data/farm/queries";
import { InventoryHeader } from "@/components/dashboard/inventory/inventory-header";
import { CriticalStockAlerts } from "@/components/dashboard/inventory/critical-stock-alerts";
import { SeedsInventory } from "@/components/dashboard/inventory/seeds-inventory";
import { FertilizersInventory } from "@/components/dashboard/inventory/fertilizers-inventory";
import { ToolsInventory } from "@/components/dashboard/inventory/tools-inventory";
import { LivestockFeedInventory } from "@/components/dashboard/inventory/livestock-feed-inventory";
import {
    AlertsSkeleton,
    GridSectionSkeleton,
    MetricTilesSkeleton
} from "@/components/dashboard/inventory/skeletons";


async function getFarmId() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) return null;

    const farms = await getFarmsByUserId(session.user.id);
    return farms[0]?.id || null;
}

export default function InventoryPage() {
    const farmIdPromise = getFarmId();

    return (
        <div className="p-6 max-w-[1440px] mx-auto space-y-8">
            {/* Static header - part of the initial shell */}
            <InventoryHeader />

            {/* Critical Alerts - streamed in */}
            <Suspense fallback={<AlertsSkeleton />}>
                <CriticalStockAlerts farmIdPromise={farmIdPromise} />
            </Suspense>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Seeds Section - Left Column (8 cols on lg) */}
                <div className="lg:col-span-8">
                    <Suspense fallback={<GridSectionSkeleton />}>
                        <SeedsInventory farmIdPromise={farmIdPromise} />
                    </Suspense>
                </div>

                {/* Fertilizers Section - Right Column (4 cols on lg) */}
                <div className="lg:col-span-4">
                    <Suspense fallback={<GridSectionSkeleton />}>
                        <FertilizersInventory farmIdPromise={farmIdPromise} />
                    </Suspense>
                </div>

                {/* Tools Section - Bottom Left (8 cols on lg) */}
                <div className="lg:col-span-8">
                    <Suspense fallback={<MetricTilesSkeleton />}>
                        <ToolsInventory farmIdPromise={farmIdPromise} />
                    </Suspense>
                </div>

                {/* Livestock Feed Section - Bottom Right (4 cols on lg) */}
                <div className="lg:col-span-4">
                    <Suspense fallback={<GridSectionSkeleton />}>
                        <LivestockFeedInventory farmIdPromise={farmIdPromise} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}