"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Package, PlusCircle, Home, LogOut, Menu, X, Image as ImageIcon, Tag } from "lucide-react";
import { useState } from "react";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  const navItems = [
    { href: "/admin", label: "Products", icon: Package },
    { href: "/admin/products/new", label: "Add Product", icon: PlusCircle },
    { href: "/admin/hero-slides", label: "Hero Slides", icon: ImageIcon },
    { href: "/admin/week-deals", label: "Week Deals", icon: Tag },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#660033] text-white p-4 flex items-center justify-between z-40">
        <div>
          <h1 className="text-lg font-bold">Mak Wines</h1>
          <p className="text-xs text-pink-200">Admin Panel</p>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Desktop: always visible, Mobile: 80% width sliding */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[80%] lg:w-64
          bg-[#660033] text-white min-h-screen flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#550028] flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Mak Wines</h1>
            <p className="text-sm text-pink-200">Admin Panel</p>
          </div>
          {/* Close button - mobile only */}
          <button
            onClick={closeSidebar}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-pink-100 hover:bg-white/10"
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Links */}
        <div className="p-4 border-t border-[#550028]">
          <Link
            href="/"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-pink-100 hover:bg-white/10 transition-colors mb-2"
          >
            <Home size={20} />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-pink-100 hover:bg-white/10 transition-colors w-full"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
