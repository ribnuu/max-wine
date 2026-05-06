"use client";

import { useMemo, useState } from "react";

export default function ProductOrderBox({
  productName,
  price,
  phoneNumber,
}: {
  productName: string;
  price: number;
  phoneNumber?: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState("");

  const contactNumber = useMemo(() => {
    const digits = phoneNumber?.replace(/\D/g, "") || "";
    return digits;
  }, [phoneNumber]);

  const whatsappUrl = useMemo(() => {
    if (!contactNumber) {
      return null;
    }

    const total = (price * quantity).toFixed(2);
    const messageLines = [
      "I want to order:",
      "",
      `Product: ${productName}`,
      `Price: £${price.toFixed(2)}`,
      `Quantity: ${quantity}`,
      `Total: £${total}`,
    ];

    const note = customMessage.trim();
    if (note) {
      messageLines.push("", `Message: ${note}`);
    }

    return `https://wa.me/${contactNumber}?text=${encodeURIComponent(messageLines.join("\n"))}`;
  }, [contactNumber, customMessage, price, productName, quantity]);

  const decrement = () => {
    setQuantity((value) => Math.max(1, value - 1));
  };

  const increment = () => {
    setQuantity((value) => value + 1);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md sm:p-6">
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Quantity
          </p>
          <p className="mt-1 text-sm text-slate-600">Choose how many you want to order</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={decrement}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-bold text-slate-900 transition hover:scale-105 hover:border-[#660033] hover:text-[#660033]"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="min-w-10 text-center text-lg font-semibold text-slate-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={increment}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-bold text-slate-900 transition hover:scale-105 hover:border-[#660033] hover:text-[#660033]"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">Custom message</span>
        <textarea
          value={customMessage}
          onChange={(event) => setCustomMessage(event.target.value)}
          rows={4}
          placeholder="Add any preferences or notes..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#660033] focus:bg-white focus:ring-4 focus:ring-[#660033]/10"
        />
      </label>

      <div className="mt-5">
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] hover:bg-green-700"
          >
            Order via WhatsApp
          </a>
        ) : (
          <div className="rounded-2xl border border-dashed border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Add a WhatsApp number in Admin &gt; Settings to enable quick ordering.
          </div>
        )}
      </div>
    </div>
  );
}
