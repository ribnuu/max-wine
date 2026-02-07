import AdminAuthGate from "@/Components/Admin/AdminAuthGate";
import AdminNav from "@/Components/Admin/AdminNav";

export const metadata = {
  title: "Admin - Mak Wines",
  description: "Mak Wines Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGate>
      <div className="min-h-screen flex bg-gray-100">
        <AdminNav />
        {/* Add top padding on mobile for the fixed header */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto pt-20 lg:pt-8">
          {children}
        </main>
      </div>
    </AdminAuthGate>
  );
}
