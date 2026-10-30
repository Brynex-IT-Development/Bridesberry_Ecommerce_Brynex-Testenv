import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | BridesBerry",
  description: "Terms and conditions of sale and website use for BridesBerry, operated by Brynex Apparels Pvt Ltd.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-neutral-800 pt-24 sm:pt-28 pb-16 font-sans">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-xs font-questrial text-neutral-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#310C13] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#C99213] font-medium">Terms &amp; Conditions</span>
        </nav>

        {/* Page Header */}
        <header className="mb-10 pb-8 border-b border-neutral-200">
          <div className="inline-block bg-[#FBF7ED] text-[#8C6A16] border border-[#E8DBB4] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Customer Agreement
          </div>
          <h1
            style={{
              fontFamily: "'Abhaya Libre', Georgia, serif",
              fontWeight: 600,
            }}
            className="text-3xl sm:text-4xl md:text-5xl text-[#310C13] tracking-tight mb-3"
          >
            Terms &amp; Conditions
          </h1>
          <p className="font-questrial text-xs sm:text-sm text-neutral-500">
            Last Updated: <strong className="text-neutral-700">October 2026</strong>
          </p>
        </header>

        {/* Content Body */}
        <article className="space-y-8 font-questrial text-sm sm:text-base leading-relaxed text-neutral-700">
          
          {/* Section: Entity Introduction */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              Welcome to BridesBerry
            </h2>
            <p>
              <strong className="text-neutral-900">BridesBerry</strong> is owned and operated by{" "}
              <strong className="text-neutral-900">Brynex Apparels Pvt Ltd</strong>, having its registered office at{" "}
              <strong className="text-neutral-900">37/3688A3, Harikeerthi Complex, Edapally, Ernakulam, Kerala - 682024, India</strong>. By accessing our website, browsing our collections, or placing an order, you agree to comply with and be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, please refrain from using our services.
            </p>
          </section>

          {/* 1. Eligibility */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              1. Eligibility
            </h2>
            <p>
              You must be 18 years of age or older to place an order on BridesBerry. By submitting an order, you confirm that you possess the legal capacity to enter into a binding contractual agreement under the Indian Contract Act, 1872.
            </p>
          </section>

          {/* 2. Your Account */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              2. Your Account
            </h2>
            <p>
              Please ensure that all personal, delivery, and contact information you provide is accurate and up to date. You are responsible for maintaining the confidentiality of your login credentials and for all activities conducted under your account. We reserve the right to suspend or terminate accounts that contain falsified details or exhibit fraudulent patterns.
            </p>
          </section>

          {/* 3. Our Products */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              3. Our Products &amp; Craftsmanship
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>
                We take utmost care to present our bridal and fine jewelry collections as faithfully as possible. However, slight color variations may occur due to photography lighting and varying screen display color gamuts. Minor variations in weight, dimension, and stone finish are natural characteristics of handcrafted artisanal jewelry.
              </li>
              <li>
                All our gold jewelry is officially <strong className="text-neutral-900">BIS hallmarked</strong>, and gold purity (e.g., 22K or 18K) is explicitly stated on each product specification sheet. Our fine silver jewelry is crafted in <strong className="text-neutral-900">92.5 Sterling Silver</strong>.
              </li>
              <li>
                Net metal weight, stone weight, making charges, and gemological certificates (where applicable) are detailed on individual product pages and your itemized tax invoice.
              </li>
            </ul>
          </section>

          {/* 4. Pricing */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              4. Pricing
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>All prices are quoted in Indian Rupees (INR) and are inclusive of applicable Goods and Services Tax (GST) unless otherwise explicitly specified.</li>
              <li>Precious metal rates change in alignment with market indices. You are billed at the exact price displayed at the time your checkout transaction is successfully completed.</li>
              <li>In the rare event that an item is listed at an incorrect price due to a clerical or technical error, we reserve the right to cancel the order and provide an immediate full refund.</li>
            </ul>
          </section>

          {/* 5. Orders */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              5. Orders &amp; Acceptance
            </h2>
            <p>
              An automated order confirmation email acknowledges receipt of your request but does not constitute final contractual acceptance. Contractual acceptance takes place upon order dispatch and courier manifest generation. We reserve the right to decline or cancel an order if an item is out of stock, payment validation fails, or courier delivery cannot be fulfilled to the specified PIN code. In such cases, a complete refund is promptly initiated.
            </p>
          </section>

          {/* 6. Payments */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              6. Payments
            </h2>
            <p>
              We accept UPI, major Credit/Debit Cards, Net Banking, digital wallets, and Cash on Delivery (COD where eligible). All online transactions are processed through 128-bit/256-bit SSL secured, PCI-DSS compliant payment gateways. For high-value jewelry purchases exceeding statutory thresholds, we may request PAN verification in compliance with Government of India regulations.
            </p>
          </section>

          {/* 7. Customised Jewellery */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              7. Customised &amp; Made-to-Order Jewellery
            </h2>
            <p>
              Bespoke, engraved, personalized, or made-to-order bridal pieces are crafted uniquely for you. Therefore, these items cannot be cancelled, modified, or returned once atelier production has commenced. Exceptions are strictly limited to verified manufacturing flaws or deviations from approved CAD specifications.
            </p>
          </section>

          {/* 8. Care & Warranty */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              8. Care &amp; Warranty
            </h2>
            <p>
              Precious jewelry requires mindful handling. Please keep jewelry away from direct exposure to perfumes, hairsprays, chlorination, water, and household cleaning chemicals. Normal wear and tear, surface hairline scratches, accidental breakage, or third-party alterations/repairs are excluded from our warranty policy.
            </p>
          </section>

          {/* 9. Intellectual Property */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              9. Intellectual Property
            </h2>
            <p>
              All proprietary designs, catalog photography, brand logos, motifs, text, animations, and software on BridesBerry are the exclusive property of Brynex Apparels Pvt Ltd and are protected under Indian Copyright and Trademark Acts. Reproduction or commercial exploitation without written consent is strictly prohibited.
            </p>
          </section>

          {/* 10. Website Usage */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              10. Prohibited Website Use
            </h2>
            <p>
              You agree not to disrupt or tamper with website servers, inject malicious scripts, reverse-engineer proprietary code, harvest automated data via crawlers/scrapers, or submit fraudulent customer reviews.
            </p>
          </section>

          {/* 11. Privacy */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              11. Privacy
            </h2>
            <p>
              Our collection and processing of personal data is governed by our dedicated{" "}
              <Link href="/privacy-policy" className="text-[#8C6A16] font-semibold underline">
                Privacy Policy
              </Link>, which forms an integral part of these Terms &amp; Conditions.
            </p>
          </section>

          {/* 12. Limitation of Liability */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              12. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by Indian jurisprudence, BridesBerry and Brynex Apparels Pvt Ltd shall not be liable for indirect, incidental, or consequential damages arising from delays caused by events beyond our reasonable control (force majeure). In all circumstances, our maximum aggregate liability shall not exceed the invoice amount paid by you for the specific item in dispute. Nothing herein restricts your rights under the Consumer Protection Act, 2019.
            </p>
          </section>

          {/* 13. Changes to Terms */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              13. Modifications to Terms
            </h2>
            <p>
              We reserve the right to revise these Terms &amp; Conditions as necessary. The version active on the platform on the timestamp of your order submission shall govern that transaction.
            </p>
          </section>

          {/* 14. Governing Law & Jurisdiction */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              14. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms and any contractual disputes arising out of your purchases shall be interpreted in accordance with the laws of the Republic of India. The courts situated in <strong className="text-neutral-900">Ernakulam, Kerala</strong> shall exercise exclusive jurisdiction, subject to consumer protection statutes.
            </p>
          </section>

          {/* 15. Grievance Redressal */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DBB4] shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              15. Grievance Redressal
            </h2>
            <p>
              For grievances, service complaints, or inquiries regarding your order, please contact our designated Grievance Officer:
            </p>
            <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8DBB4]/60 space-y-2 text-sm text-neutral-800">
              <p><strong className="text-neutral-900">Company:</strong> Brynex Apparels Pvt Ltd (BridesBerry)</p>
              <p><strong className="text-neutral-900">Desk:</strong> Grievance Officer &amp; Customer Relations</p>
              <p>
                <strong className="text-neutral-900">Email:</strong>{" "}
                <a href="mailto:rootmentsit@gmail.com" className="text-[#8C6A16] hover:underline font-medium">
                  rootmentsit@gmail.com
                </a>
              </p>
              <p><strong className="text-neutral-900">Hours:</strong> Monday – Saturday (10:00 AM – 6:00 PM IST)</p>
              <p><strong className="text-neutral-900">Office:</strong> 37/3688A3, Harikeerthi Complex, Edapally, Ernakulam, Kerala - 682024</p>
            </div>
            <p className="text-xs text-neutral-500">
              Complaints are acknowledged within 48 hours and resolved systematically within 30 days.
            </p>
          </section>

        </article>

        {/* Footer Navigation Back to Policies */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs font-questrial text-neutral-500">
          <Link href="/" className="text-[#310C13] hover:underline font-medium">
            &larr; Back to BridesBerry Home
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#310C13] underline">Privacy Policy</Link>
            <Link href="/shipping-policy" className="hover:text-[#310C13] underline">Shipping Policy</Link>
            <Link href="/return-policy" className="hover:text-[#310C13] underline">Return Policy</Link>
            <Link href="/refund-policy" className="hover:text-[#310C13] underline">Refund Policy</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

