"use client";

import React from "react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-[#660033] mb-2">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: 2026</p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small pieces of data stored on your device when you visit a website. They help websites remember information about you, such as your preferences and login status. Cookies are widely used to make websites work more efficiently and to provide information to the owners of the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">2. How We Use Cookies</h2>
              <p>
                Mak Wines uses cookies for various purposes:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>To enhance user experience and site functionality</li>
                <li>To remember your preferences and settings</li>
                <li>To analyze website traffic and user behavior</li>
                <li>To personalize content and recommendations</li>
                <li>To track advertising effectiveness</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">3. Types of Cookies We Use</h2>
              <p>
                <strong>Session Cookies:</strong> These cookies are temporary and expire when you close your browser. They help us recognize you during your browsing session.
              </p>
              <p className="mt-3">
                <strong>Persistent Cookies:</strong> These cookies remain on your device even after you close your browser. They help us remember your preferences on future visits.
              </p>
              <p className="mt-3">
                <strong>Third-Party Cookies:</strong> We may allow third-party service providers to place cookies on your device to help us analyze site traffic and improve our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">4. Your Cookie Choices</h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can typically delete cookies and configure your browser to reject or notify you before accepting new cookies. However, disabling cookies may affect your ability to use certain features on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">5. Third-Party Cookies</h2>
              <p>
                We use third-party services such as Google Analytics to track and analyze website traffic. These services may place their own cookies on your device. We encourage you to review the privacy policies of these third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">6. Security</h2>
              <p>
                We implement security measures to protect your data. However, no method of transmission over the internet is completely secure. We recommend being cautious when sharing sensitive information online.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">7. GDPR Compliance</h2>
              <p>
                For users in the European Union, we comply with the General Data Protection Regulation (GDPR) regarding cookies. We obtain your consent before placing non-essential cookies on your device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">8. Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. We will notify you of significant changes by posting the updated policy on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">9. Contact Us</h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us at:{" "}
                <a href="mailto:mak@makwines.co.uk" className="text-[#660033] hover:underline">
                  mak@makwines.co.uk
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
