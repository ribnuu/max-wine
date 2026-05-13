"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-[#660033] mb-8">About Us</h1>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#660033] mb-4">About Mak Wines</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Mak Wines, your premier destination for quality drinks at unbeatable prices. We&apos;ve been serving our community for over 15 years, providing an extensive selection of spirits, wines, beers, and more. We are committed to bringing quality beverages and exceptional service to every customer.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#660033] mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 2010, Mak Wines started as a small family business with a passion for bringing quality beverages to our local community. Today, we operate multiple stores across the region, each committed to the same values of quality, affordability, and excellent customer service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Over the years, we&apos;ve built strong relationships with our suppliers, allowing us to offer an unmatched selection of premium products at competitive prices. Our success is built on the trust and loyalty of our customers, and we remain dedicated to maintaining those values.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#660033] mb-4">What We Stand For</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Quality products at competitive prices</li>
              <li>Expert knowledge and friendly service</li>
              <li>Responsible retailing and community engagement</li>
              <li>Wide selection to suit every taste and occasion</li>
              <li>Commitment to customer satisfaction</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#660033] mb-4">What You&apos;ll Find In Store</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-[#660033] mb-3">Premium Spirits</h3>
                <p className="text-gray-700 text-sm">Vodkas, gins, rums, whiskeys, and more from leading brands worldwide.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-[#660033] mb-3">Fine Wines</h3>
                <p className="text-gray-700 text-sm">Red, white, and rosé wines selected from vineyards across the globe.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-[#660033] mb-3">Beers & Ciders</h3>
                <p className="text-gray-700 text-sm">Craft beers, lagers, and refreshing ciders for every palate.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-[#660033] mb-3">Ready Mixed Drinks & More</h3>
                <p className="text-gray-700 text-sm">Convenient pre-mixed cocktails, sweets, vapes, and e-liquids.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#660033] mb-4">Visit Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We&apos;re located in Abingdon, Oxfordshire, and we&apos;d love to welcome you to our store. Our knowledgeable staff are always on hand to help you find exactly what you&apos;re looking for, whether you&apos;re a connoisseur seeking a rare vintage or simply looking for a great deal on your favorite tipple.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-gray-700">
                <strong>Mak Wines</strong><br />
                6 Peachcroft Shopping Centre<br />
                Peachcroft Road<br />
                Abingdon, Oxfordshire OX14 2QA<br /><br />
                Email: <a href="mailto:mak@makwines.co.uk" className="text-[#660033] hover:underline">mak@makwines.co.uk</a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
