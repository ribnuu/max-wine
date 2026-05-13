"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, MapPin, Clock } from "lucide-react";

type SiteSettings = {
  email: string;
  phone: string;
  address: string;
  opening_hours_weekday: string;
  opening_hours_weekend: string;
};

const defaultSettings: SiteSettings = {
  email: "mak@makwines.co.uk",
  phone: "",
  address: "6 Peachcroft Shopping Centre, Peachcroft Road, Abingdon, Oxfordshire, OX14 2QA",
  opening_hours_weekday: "Sun - Thu: 12pm - 9pm",
  opening_hours_weekend: "Fri - Sat: 12pm - 10pm",
};

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/site-settings", { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        if (data && !data.error) {
          setSiteSettings((current) => ({ ...current, ...data }));
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 border-b border-white/10 pb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Mak Wines</h2>
          <p className="text-sm text-white/75">Your local off-licence in Abingdon</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connected Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-white/75 hover:text-white transition">
                  → Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/75 hover:text-white transition">
                  → About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/75 hover:text-white transition">
                  → Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/75 hover:text-white transition">
                  → Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/75 hover:text-white transition">
                  → Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-white/75 hover:text-white transition">
                  → Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact Details */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Details</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#660033]" />
                <a href="mailto:mak@makwines.co.uk" className="text-white/75 hover:text-white transition">
                  mak@makwines.co.uk
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#660033]" />
                <span className="text-white/75">{siteSettings.address}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Opening Hours</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#660033]" />
                <div className="text-white/75">
                  <p className="font-medium">Weekdays</p>
                  <p>{siteSettings.opening_hours_weekday}</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="text-white/75">
                  <p className="font-medium">Weekends</p>
                  <p>{siteSettings.opening_hours_weekend}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center text-xs text-white/55">
          <p>© 2026 Mak Wines. All rights reserved. | Drink responsibly. Must be 18+</p>
        </div>
      </div>
    </footer>
  );
}
