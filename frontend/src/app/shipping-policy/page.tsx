import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | BridesBerry",
  description: "Shipping and delivery policy for BridesBerry fine and bridal jewelry across India.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-neutral-800 pt-24 sm:pt-28 pb-16 font-sans">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-xs font-questrial text-neutral-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#310C13] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#C99213] font-medium">Shipping Policy</span>
        </nav>

        {/* Page Header */}
        <header className="mb-10 pb-8 border-b border-neutral-200">
          <div className="inline-block bg-[#FBF7ED] text-[#8C6A16] border border-[#E8DBB4] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Secure Delivery &amp; Logistics
          </div>
          <h1
            style={{
              fontFamily: "'Abhaya Libre', Georgia, serif",
              fontWeight: 600,
            }}
            className="text-3xl sm:text-4xl md:text-5xl text-[#310C13] tracking-tight mb-3"
          >
            Shipping Policy
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
              Insured &amp; Tamper-Evident Delivery
            </h2>
            <p>
              At <strong className="text-neutral-900">BridesBerry</strong> (operated by Brynex Apparels Pvt Ltd), we understand that your bridal jewelry represents both financial investment and deep emotional significance. We pack every single piece securely in tamper-evident, discreet protective packaging and ship it <strong className="text-neutral-900">100% fully insured</strong> until it reaches your hands.
            </p>
          </section>

          {/* 1. Where We Deliver */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              1. Where We Deliver
            </h2>
            <p>
              We deliver across India to all serviceable PIN codes through premier logistics networks (including Shiprocket, Blue Dart, and Delhivery). You can check PIN code deliverability and estimated timelines on product and checkout pages.
            </p>
            <p className="text-xs text-neutral-500">
              * Note: We currently ship within India only. International deliveries are not supported at this time.
            </p>
          </section>

          {/* 2. Processing Time */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              2. Processing &amp; Atelier Handling Time
            </h2>
            <p>
              Before dispatch, each piece undergoes a rigorous quality inspection, BIS hallmark verification, and ultrasonic sanitization:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-neutral-200 rounded-xl overflow-hidden">
                <thead className="bg-[#FAF7F2] text-[#310C13] font-semibold">
                  <tr>
                    <th className="py-3 px-4 border-b border-neutral-200">Jewelry Order Type</th>
                    <th className="py-3 px-4 border-b border-neutral-200">Dispatch Timeframe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 font-medium text-neutral-800">Ready-to-ship catalog designs</td>
                    <td className="py-3 px-4 text-neutral-600">1 to 3 business days</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 font-medium text-neutral-800">Custom ring/bangle resizing or engraving</td>
                    <td className="py-3 px-4 text-neutral-600">5 to 7 business days</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 font-medium text-neutral-800">Customised or made-to-order bridal sets</td>
                    <td className="py-3 px-4 text-neutral-600">10 to 21 business days (confirmed during order consultation)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-neutral-500">
              Business days are Monday through Saturday, excluding gazetted national holidays. During peak wedding and Diwali seasons, dispatch may take 1–2 days longer due to high volume.
            </p>
          </section>

          {/* 3. Delivery Time */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              3. Transit &amp; Delivery Timelines
            </h2>
            <p>Once dispatched from our fulfillment center, estimated transit times are:</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-neutral-200 rounded-xl overflow-hidden">
                <thead className="bg-[#FAF7F2] text-[#310C13] font-semibold">
                  <tr>
                    <th className="py-3 px-4 border-b border-neutral-200">Destination Region</th>
                    <th className="py-3 px-4 border-b border-neutral-200">Estimated Delivery After Dispatch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 font-medium text-neutral-800">Within Kerala and Tier-1 Metro Cities</td>
                    <td className="py-3 px-4 text-neutral-600">2 to 4 business days</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 font-medium text-neutral-800">Rest of India (Tier 2/3 Towns)</td>
                    <td className="py-3 px-4 text-neutral-600">4 to 7 business days</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 font-medium text-neutral-800">Remote locations, J&amp;K, and North-East</td>
                    <td className="py-3 px-4 text-neutral-600">7 to 10 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Shipping Charges */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              4. Shipping Charges &amp; COD
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>
                <strong className="text-neutral-900">Complimentary Shipping:</strong> Free insured express shipping on all prepaid orders exceeding ₹1,999.
              </li>
              <li>
                <strong className="text-neutral-900">Standard Orders:</strong> A nominal flat fee of ₹150 applies to orders below ₹1,999.
              </li>
              <li>
                <strong className="text-neutral-900">Cash on Delivery (COD):</strong> Available for eligible PIN codes for orders up to ₹10,000, subject to a ₹100 verification fee.
              </li>
            </ul>
          </section>

          {/* 5. Tracking and Insurance */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              5. Tracking &amp; Transit Insurance
            </h2>
            <p>
              Every parcel is insured against loss, transit damage, or theft up until the confirmed point of physical delivery. When your order is handed over to the courier, we send you the courier partner name, AWB tracking number, and live tracking URL via Email, SMS, and WhatsApp. You can also view live delivery progress anytime under &quot;My Orders&quot;.
            </p>
          </section>

          {/* 6. Delivery Rules */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              6. Security &amp; Delivery Rules
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>We deliver exclusively to the physical address recorded on your order. Address changes can only be accommodated prior to courier handover.</li>
              <li>Due to the high value of fine jewelry, couriers are instructed to deliver only against an OTP sent to your registered mobile number and/or presentation of a government ID.</li>
              <li>The package must be physically accepted by an individual aged 18 or above.</li>
            </ul>
          </section>

          {/* 7. Mandatory Unboxing Video */}
          <section className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border-2 border-[#E8DBB4] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#8C6A16] font-bold text-xs uppercase tracking-widest">
              <span>⚠️ Important Customer Requirement</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              7. When You Receive Your Parcel (Mandatory Unboxing Video)
            </h2>
            <p className="text-neutral-700">
              Please inspect the outer package before accepting it. If the tamper-evident security tape appears broken, sliced, torn, or wet, <strong className="text-neutral-900">do not accept delivery</strong>, or instruct the courier agent to note the condition on the physical or digital Proof of Delivery (POD).
            </p>
            <div className="bg-white p-4 rounded-xl border border-[#E8DBB4] text-sm text-neutral-800 space-y-2">
              <p className="font-semibold text-[#310C13]">Video Documentation Guidelines:</p>
              <p>
                To protect against fraudulent claims and satisfy transit insurance claims, you <strong className="text-[#310C13]">must record a continuous, unedited unboxing video</strong> starting from the moment you cut open the sealed tamper-proof outer bag, clearly displaying the shipping label, barcode, the jewelry presentation box, and the piece itself.
              </p>
              <p className="text-xs text-neutral-500">
                Any transit damage, missing accessory, stone displacement, or wrong item claim must be reported with this video within <strong className="text-neutral-800">48 hours of delivery</strong>.
              </p>
            </div>
          </section>

          {/* 8. Failed Deliveries */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              8. Failed Delivery Attempts &amp; RTO
            </h2>
            <p>
              Our courier partners make up to three attempts to complete delivery. If delivery fails due to an incorrect address, recipient unavailability, or refusal to accept a COD order, the parcel will return to our warehouse (RTO). A re-dispatch fee of ₹150 may apply to arrange re-delivery. If an undelivered order is cancelled by the customer, refund will be issued minus outward and return shipping fees.
            </p>
          </section>

          {/* 9. Lost Parcels */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              9. Lost in Transit
            </h2>
            <p>
              In the unlikely event that a parcel is confirmed lost or untraceable in transit by the courier partner, our team conducts an internal verification within 7 business days and immediately dispatches a brand-new replacement piece or issues a 100% full refund to your original payment method.
            </p>
          </section>

          {/* 10. Contact Us */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              10. Shipping Inquiries
            </h2>
            <p>
              For shipping queries, tracking assistance, or pin-code verification, contact our logistics concierge:
            </p>
            <p className="text-sm">
              Email: <a href="mailto:rootmentsit@gmail.com" className="text-[#8C6A16] font-semibold underline">rootmentsit@gmail.com</a> | Operating Hours: Monday – Saturday (10:00 AM – 6:00 PM IST)
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
            <Link href="/return-policy" className="hover:text-[#310C13] underline">Return Policy</Link>
            <Link href="/refund-policy" className="hover:text-[#310C13] underline">Refund Policy</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

