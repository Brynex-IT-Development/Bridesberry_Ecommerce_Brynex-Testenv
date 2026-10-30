import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | BridesBerry",
  description: "7-day return and exchange guidelines for BridesBerry fine bridal jewelry.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-neutral-800 pt-24 sm:pt-28 pb-16 font-sans">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-xs font-questrial text-neutral-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#310C13] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#C99213] font-medium">Return &amp; Exchange Policy</span>
        </nav>

        {/* Page Header */}
        <header className="mb-10 pb-8 border-b border-neutral-200">
          <div className="inline-block bg-[#FBF7ED] text-[#8C6A16] border border-[#E8DBB4] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Customer Assurance &amp; Satisfaction
          </div>
          <h1
            style={{
              fontFamily: "'Abhaya Libre', Georgia, serif",
              fontWeight: 600,
            }}
            className="text-3xl sm:text-4xl md:text-5xl text-[#310C13] tracking-tight mb-3"
          >
            Return &amp; Exchange Policy
          </h1>
          <p className="font-questrial text-xs sm:text-sm text-neutral-500">
            Last Updated: <strong className="text-neutral-700">October 2026</strong>
          </p>
        </header>

        {/* Content Body */}
        <article className="space-y-8 font-questrial text-sm sm:text-base leading-relaxed text-neutral-700">
          
          {/* Section: Overview */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              7-Day Return &amp; Exchange Window
            </h2>
            <p>
              We want you to treasure your <strong className="text-neutral-900">BridesBerry</strong> jewelry. If you are not entirely satisfied with your purchase, you may request a return or exchange for eligible pieces within <strong className="text-neutral-900">7 days of confirmed delivery</strong>, subject to the guidelines detailed below.
            </p>
          </section>

          {/* 1. How to Request a Return */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              1. How to Initiate a Return or Exchange
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-neutral-600">
              <li>
                <strong className="text-neutral-800">Submit Request:</strong> Contact us within 7 days of delivery at{" "}
                <a href="mailto:rootmentsit@gmail.com" className="text-[#8C6A16] underline font-medium">rootmentsit@gmail.com</a>{" "}
                or initiate a request through &quot;My Orders&quot; in your customer account. Include your Order ID, contact number, and reason for return.
              </li>
              <li>
                <strong className="text-neutral-800">Verification:</strong> Our concierge team reviews your request within 2 business days and issues a Return Merchandise Authorization (RMA).
              </li>
              <li>
                <strong className="text-neutral-800">Insured Pickup:</strong> Once approved, we schedule a doorstep pickup via our insured logistics partner.
              </li>
              <li>
                <strong className="text-neutral-800">Secure Repackaging:</strong> Carefully pack the jewelry into its original presentation box with all foam cushions, authenticity cards, hallmark certificates, tags, invoice, and free promotional items intact.
              </li>
              <li>
                <strong className="text-neutral-800">Atelier Inspection:</strong> Upon receipt at our facility, our gemologists inspect the item within 3 to 5 business days.
              </li>
            </ol>
            <p className="text-xs text-neutral-500 italic">
              * Note: Please return items only through our designated courier service. For security and insurance compliance, we cannot accept self-shipped or unmanifested parcels.
            </p>
          </section>

          {/* 2. What We Accept */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              2. Eligible Items for Return
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>Jewelry pieces that are completely unworn, unused, odorless, and in original pristine condition.</li>
              <li>Pieces returned in original packaging with untampered hallmark security tags, authenticity cards, and the physical invoice.</li>
              <li>Pieces that arrived damaged, defective, or mismatched from your invoice (supported by unboxing video documentation).</li>
            </ul>
          </section>

          {/* 3. What We Cannot Accept */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              3. Non-Returnable Items
            </h2>
            <p className="text-neutral-600">To preserve authenticity and hygiene standards, the following cannot be returned or exchanged:</p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>
                <strong className="text-neutral-800">Customized &amp; Engraved Jewelry:</strong> Personalized bridal sets, bespoke engravings, or items crafted to custom dimensions.
              </li>
              <li>
                <strong className="text-neutral-800">Resized or Altered Items:</strong> Any ring, bangle, or necklace altered by third-party jewelers.
              </li>
              <li>
                <strong className="text-neutral-800">Precious Bullion:</strong> 24K gold and 999 silver coins or bars.
              </li>
              <li>
                <strong className="text-neutral-800">Earrings &amp; Nose Pins:</strong> For stringent personal hygiene reasons, pierced jewelry is non-returnable unless received damaged upon opening.
              </li>
              <li>
                <strong className="text-neutral-800">Clearance &amp; Final Sale:</strong> Marked clearance or bridal warehouse items explicitly labeled as final sale.
              </li>
              <li>
                <strong className="text-neutral-800">Damaged / Missing Hallmark Tags:</strong> Any piece showing signs of wear, perfume stains, scratches, or missing hallmark tags.
              </li>
            </ul>
          </section>

          {/* 4. Damaged, Defective or Wrong Items */}
          <section className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DBB4] shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              4. Damaged, Defective or Incorrect Items
            </h2>
            <p>
              If your jewelry arrives with a manufacturing defect, stone detachment, or differs from what you ordered, please contact us within <strong className="text-neutral-900">48 hours of delivery</strong> with your order number, clear high-resolution photographs, and the continuous <strong className="text-[#310C13]">unboxing video</strong>.
            </p>
            <p className="text-sm text-neutral-700">
              We arrange immediate complimentary pickup and, upon quick inspection, dispatch an expedited replacement piece or issue a 100% full refund at your preference.
            </p>
          </section>

          {/* 5. Quality Check */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              5. Atelier Quality Verification
            </h2>
            <p>
              Each returned piece is assessed by certified gemologists for gross weight, gold purity, stone integrity, and packaging completeness. If an item fails to match our dispatch records or violates return terms, the return will be rejected and the piece will be shipped back to you at your expense.
            </p>
          </section>

          {/* 6. Exchanges */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              6. Exchanges
            </h2>
            <p>
              You may exchange an eligible piece for an alternative size or different bridal design, subject to live inventory availability. If the new item has a higher price, you pay the difference at checkout. If the new item costs less, the balance will be refunded or credited to your account as store credit.
            </p>
          </section>

          {/* 7. Return Shipping Charges */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              7. Return Shipping Costs
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li><strong className="text-neutral-800">Damaged / Defective / Wrong Items:</strong> Doorstep pickup and replacement shipping is 100% free of charge.</li>
              <li><strong className="text-neutral-800">Change of Mind:</strong> A nominal return handling and insurance fee of ₹150 is deducted from the final refund amount.</li>
            </ul>
          </section>

          {/* 8. Precious Metal Price Fluctuation */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              8. Market Price Changes
            </h2>
            <p>
              Precious metal bullion rates fluctuate daily in the open market. All refunds are computed strictly based on the net invoice price paid by you at the time of purchase, irrespective of upward or downward market price shifts upon return date.
            </p>
          </section>

          {/* 9. Contact */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              9. Contact Our Returns Desk
            </h2>
            <p>
              For return inquiries, please write to{" "}
              <a href="mailto:rootmentsit@gmail.com" className="text-[#8C6A16] font-semibold underline">
                rootmentsit@gmail.com
              </a>{" "}
              or reach our customer desk between 10:00 AM – 6:00 PM IST (Mon – Sat).
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
            <Link href="/terms-and-conditions" className="hover:text-[#310C13] underline">Terms &amp; Conditions</Link>
            <Link href="/shipping-policy" className="hover:text-[#310C13] underline">Shipping Policy</Link>
            <Link href="/refund-policy" className="hover:text-[#310C13] underline">Refund Policy</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

