"use client";

import { useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", page: "home" },
  { label: "Offers", page: "offers" },
  { label: "Week Deals", page: "week-deals" },
  { label: "Category", page: "category" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigateToPage = (page: string | unknown) => {
    if (typeof page !== "string") {
      console.warn("[Navbar] Invalid page parameter (not a string):", page);
      return;
    }

    console.log("[Navbar] Navigating to page:", page);
    router.push(`/?page=${encodeURIComponent(page)}`);
    setMobileOpen(false);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (typeof searchQuery !== "string") {
      console.warn("[Navbar] Invalid search query (not a string):", searchQuery);
      return;
    }

    const query = searchQuery.trim();
    console.log("[Navbar] Search query:", query);

    if (!query) {
      router.push("/");
      return;
    }

    router.push(`/?page=search&q=${encodeURIComponent(query)}`);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between px-10 py-4 bg-[#660033] text-white md:px-16">
        <div
          onClick={() => router.push("/?page=home")}
          className="cursor-pointer text-2xl md:text-3xl font-bold tracking-wide whitespace-nowrap"
        >
          MakWines <span className="text-base md:text-lg font-normal">(Abingdon)</span>
        </div>

        <form onSubmit={handleSearchSubmit} className="hidden md:block flex-1 mx-8 max-w-2xl min-w-0">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-gray-300 px-6 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
              <Search
                size={20}
                strokeWidth={2}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 opacity-80"
              />
          </div>
        </form>

        <nav className="hidden items-center gap-6 text-sm md:text-base font-medium md:flex whitespace-nowrap">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => navigateToPage(item.page)}
              className="hover:text-gray-300 transition"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/20 p-2 transition hover:bg-white/10 md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#660033] px-4 pb-4 md:hidden">
          <form onSubmit={handleSearchSubmit} className="pb-3 pt-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-gray-300 px-6 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
                <Search
                  size={20}
                  strokeWidth={2}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 opacity-80"
                />
            </div>
          </form>

          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => navigateToPage(item.page)}
                className="rounded-xl px-3 py-2 text-left text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
