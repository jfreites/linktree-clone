import { AdminSidebar } from "@/components/shared";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
    <AdminSidebar />
      <main className="w-full bg-[#F3F3F1]">
        <div className="px-3">
        <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}