"use client";

import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-[#660033] mb-2">Terms & Conditions</h1>
          <p className="text-gray-600 mb-8">Last updated: 2026</p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Mak Wines website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transmit the materials to anyone else or &quot;mirror&quot; the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">3. Disclaimer</h2>
              <p>
                The materials on Mak Wines website are provided &quot;as is&quot;. Mak Wines makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">4. Limitations</h2>
              <p>
                In no event shall Mak Wines or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Mak Wines website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on Mak Wines website could include technical, typographical, or photographic errors. Mak Wines does not warrant that any of the materials on the website are accurate, complete, or current. Mak Wines may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">6. Links</h2>
              <p>
                Mak Wines has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Mak Wines of the site. Use of any such linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">7. Modifications</h2>
              <p>
                Mak Wines may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom, and you irrevocably submit to the exclusive jurisdiction of the courts located in England.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#660033] mb-4">9. Contact Information</h2>
              <p>
                If you have any questions about these Terms & Conditions, please contact us at:{" "}
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
