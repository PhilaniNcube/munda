import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/sidebar-nav";
import { Header } from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <Header title="Farm Overview" />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 bg-agri-surface">
          <div className="mx-auto max-w-[1440px]">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
