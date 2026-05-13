"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

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
  address: "6 Peachcroft Shopping Centre, Peachcroft road, Abingdon, Oxfordshire, OX14 2QA.",
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
      <div className="bg-[#660033] px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h3 className="text-xl font-bold sm:text-2xl">Mak Wines News</h3>
          <p className="mt-2 text-sm text-pink-100 sm:text-base">
            Join and find out about all of our week deals.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#660033] transition hover:scale-105 hover:bg-pink-50"
            >
              Visit Store
            </Link>
            <a
              href="mailto:mak@makwines.co.uk"
              className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold transition hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <h4 className="text-lg font-bold">Mak Wines</h4>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Your premier destination for quality drinks at unbeatable prices.
          </p>
        </div>

        <div className="space-y-3 text-sm text-white/75">
          <p className="flex items-start gap-2">
            <Mail className="mt-0.5 h-4 w-4 flex-none" />
            <span>{siteSettings.email}</span>
          </p>
          {siteSettings.phone && (
            <p className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 flex-none" />
              <span>{siteSettings.phone}</span>
            </p>
          )}
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 flex-none" />
            <span>{siteSettings.address}</span>
          </p>
        </div>

        <div className="space-y-3 text-sm text-white/75">
          <p className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 flex-none" />
            <span>
              {siteSettings.opening_hours_weekday}
              <br />
              {siteSettings.opening_hours_weekend}
            </span>
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/" className="transition hover:text-pink-200">
              Home
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/55 sm:px-6">
        © 2025 Mak Wines. All rights reserved. | Drink responsibly. Must be 18+
      </div>
    </footer>
  );
}
