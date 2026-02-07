"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import AdminAuthGate from "@/Components/Admin/AdminAuthGate";
import { SiteSettings } from "@/lib/types/siteSettings";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [settings, setSettings] = useState<SiteSettings>({
    email: "",
    phone: "",
    address: "",
    opening_hours_weekday: "",
    opening_hours_weekend: "",
    add_product_enabled: false,
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    // Check if passwords match when changing password
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setMessage({ type: "error", text: "Passwords do not match" });
        setSaving(false);
        return;
      }
      if (newPassword.length < 4) {
        setMessage({ type: "error", text: "Password must be at least 4 characters" });
        setSaving(false);
        return;
      }
    }

    try {
      const dataToSave = {
        ...settings,
        admin_password: newPassword || undefined,
      };

      const res = await fetch("/api/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Settings saved successfully!" });
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "error", text: "Failed to save settings" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save settings" });
    }

    setSaving(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  return (
    <AdminAuthGate>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#660033] text-white p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => router.push("/admin")}
              className="flex items-center gap-2 text-pink-200 hover:text-white mb-4 transition text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold">Site Settings</h1>
            <p className="text-pink-200 mt-1 text-sm sm:text-base">
              Manage footer contact information and opening hours
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#660033]" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-6">
              {message && (
                <div
                  className={`p-4 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033]"
                  placeholder="mak@makwines.co.uk"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (leave empty to hide)
                </label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033]"
                  placeholder="01235 531063"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033]"
                  placeholder="6 Peachcroft Shopping Centre, Peachcroft road, Abingdon, Oxfordshire, OX14 2QA."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Hours (Weekday)
                </label>
                <input
                  type="text"
                  name="opening_hours_weekday"
                  value={settings.opening_hours_weekday}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033]"
                  placeholder="Sun - Thu: 12pm - 9pm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Hours (Weekend)
                </label>
                <input
                  type="text"
                  name="opening_hours_weekend"
                  value={settings.opening_hours_weekend}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033]"
                  placeholder="Fri - Sat: 12pm - 10pm"
                />
              </div>

              {/* Admin Controls Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Controls</h3>

                {/* Add Product Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                  <div>
                    <label className="font-medium text-gray-700">Enable Add Product</label>
                    <p className="text-sm text-gray-500">Allow adding new products from admin panel</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, add_product_enabled: !settings.add_product_enabled })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.add_product_enabled ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                        settings.add_product_enabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Password Change Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                <p className="text-sm text-gray-500 mb-4">Leave empty to keep current password</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033]"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033]"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#660033] text-white py-3 rounded-lg hover:bg-[#550028] transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Settings
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </AdminAuthGate>
  );
}
