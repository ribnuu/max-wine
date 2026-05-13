"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-[#660033] mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: 2026</p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">1. Introduction</h2>
              <p>
                Mak Wines (&quot;we&quot; or &quot;us&quot; or &quot;our&quot;) operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">2. Information Collection and Use</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our service to you.
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Personal Data: While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (&quot;Personal Data&quot;).</li>
                <li>Usage Data: We may also collect information on how the service is accessed and used (&quot;Usage Data&quot;).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">3. Use of Data</h2>
              <p>Mak Wines uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To allow you to participate in interactive features of our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so we can improve our service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">4. Security of Data</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">5. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:{" "}
                <a href="mailto:mak@makwines.co.uk" className="text-[#660033] hover:underline">
                  mak@makwines.co.uk
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">7. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise any of these rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">8. Third-Party Services</h2>
              <p>
                We may use third-party service providers to analyze site traffic and better understand user needs. These third parties may place cookies on your browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">9. GDPR Compliance</h2>
              <p>
                For users in the European Union, we comply with the General Data Protection Regulation (GDPR). Your data is processed lawfully and with your consent where applicable.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
