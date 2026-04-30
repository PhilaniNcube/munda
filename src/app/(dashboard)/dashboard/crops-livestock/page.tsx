import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader } from "./components/page-header";
import { ActiveCropsTable } from "./components/active-crops-table";
import { ActiveCropsTableSkeleton } from "./components/active-crops-table-skeleton";
import { LivestockTable } from "./components/livestock-table";
import { LivestockTableSkeleton } from "./components/livestock-table-skeleton";
import { Suspense } from "react";

export default function CropsLivestockPage() {
    return (
        <div className="p-6 max-w-[1440px] mx-auto">
            <PageHeader />

            <Tabs defaultValue="crops" className="w-full">
                <div className="border-b border-agri-outline-variant mb-6 pb-0">
                    <TabsList variant="line" className="h-10 pb-0">
                        <TabsTrigger value="crops" className="text-body-lg font-semibold h-10 px-4 data-active:text-agri-primary data-active:after:bg-agri-primary">
                            Crops
                        </TabsTrigger>
                        <TabsTrigger value="livestock" className="text-body-lg font-semibold h-10 px-4 data-active:text-agri-primary data-active:after:bg-agri-primary">
                            Livestock
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="crops" className="mt-0 outline-none">
                    <Suspense fallback={<ActiveCropsTableSkeleton />}>
                        <ActiveCropsTable />
                    </Suspense>
                </TabsContent>

                <TabsContent value="livestock" className="mt-0 outline-none">
                    <Suspense fallback={<LivestockTableSkeleton />}>
                        <LivestockTable />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </div>
    );
}