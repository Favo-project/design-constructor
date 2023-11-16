import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="dashboard">
      <DashboardSidebar />
      <div className="p-4 lg:ml-56 bg-[#f5f8fc] h-[100vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
