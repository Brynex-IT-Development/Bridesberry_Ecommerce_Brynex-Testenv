import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | BridesBerry",
  description: "Comprehensive refund process, payment method timelines, and cancellation policy for BridesBerry.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-neutral-800 pt-24 sm:pt-28 pb-16 font-sans">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-xs font-questrial text-neutral-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#310C13] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#C99213] font-medium">Refund Policy</span>
        </nav>

        {/* Page Header */}
        <header className="mb-10 pb-8 border-b border-neutral-200">
          <div className="inline-block bg-[#FBF7ED] text-[#8C6A16] border border-[#E8DBB4] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Financial Transparency
          </div>
          <h1
            style={{
              fontFamily: "'Abhaya Libre', Georgia, serif",
              fontWeight: 600,
            }}
            className="text-3xl sm:text-4xl md:text-5xl text-[#310C13] tracking-tight mb-3"
          >
            Refund Policy
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
              Fair &amp; Prompt Refunds
            </h2>
            <p>
              This Refund Policy explains when and how <strong className="text-neutral-900">BridesBerry</strong> (operated by Brynex Apparels Pvt Ltd) processes refunds for orders and returns. Please review this document in conjunction with our{" "}
              <Link href="/return-policy" className="text-[#8C6A16] underline font-medium">
                Return &amp; Exchange Policy
              </Link>.
            </p>
          </section>

          {/* 1. When We Issue a Refund */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              1. Circumstances Under Which Refunds Are Issued
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>Your returned jewelry has arrived at our facility, passed gemological quality verification, and received approval.</li>
              <li>Your piece arrived damaged, flawed, or incorrect, and you reported it within 48 hours accompanied by the continuous unboxing video.</li>
              <li>You cancelled an order prior to warehouse dispatch and courier manifest generation.</li>
              <li>We cancelled your order due to stock unavailability, pricing errors, or undeliverable shipping pin codes.</li>
              <li>A courier parcel was officially confirmed lost in transit after investigation.</li>
            </ul>
          </section>

          {/* 2. How We Process Refunds */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              2. How Refunds Are Processed
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-neutral-600">
              <li>Following quality inspection (within 3 to 5 business days of item receipt), you receive an email notifying you of approval or status.</li>
              <li>Once approved, our accounts desk initiates the refund within <strong className="text-neutral-900">2 business days</strong>.</li>
              <li>Refunds are routed back strictly to the original payment source used during purchase.</li>
            </ol>
          </section>

          {/* 3. Refund Timelines Table */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              3. Refund Timelines by Payment Mode
            </h2>
            <p className="text-neutral-600">
              Once initiated by BridesBerry, financial institutions require varying processing windows to reflect credits on your statement:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-neutral-200 rounded-xl overflow-hidden">
                <thead className="bg-[#FAF7F2] text-[#310C13] font-semibold">
                  <tr>
                    <th className="py-3 px-4 border-b border-neutral-200">Original Payment Method</th>
                    <th className="py-3 px-4 border-b border-neutral-200">Destination Account</th>
                    <th className="py-3 px-4 border-b border-neutral-200">Estimated Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 font-medium text-neutral-800">UPI (GPay, PhonePe, Paytm)</td>
                    <td className="py-3 px-4 text-neutral-600">Linked VPA / Bank Account</td>
                    <td className="py-3 px-4 text-neutral-600">2 to 5 business days</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 font-medium text-neutral-800">Credit / Debit Card</td>
                    <td className="py-3 px-4 text-neutral-600">Issuing Bank Card Account</td>
                    <td className="py-3 px-4 text-neutral-600">5 to 10 business days</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 font-medium text-neutral-800">Net Banking</td>
                    <td className="py-3 px-4 text-neutral-600">Originating Bank Account</td>
                    <td className="py-3 px-4 text-neutral-600">5 to 7 business days</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 font-medium text-neutral-800">Prepaid Digital Wallets</td>
                    <td className="py-3 px-4 text-neutral-600">Same Wallet Balance</td>
                    <td className="py-3 px-4 text-neutral-600">Up to 48 hours</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 font-medium text-neutral-800">Cash on Delivery (COD)</td>
                    <td className="py-3 px-4 text-neutral-600">Verified NEFT / IMPS Bank Account</td>
                    <td className="py-3 px-4 text-neutral-600">5 to 7 business days after bank verification</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-neutral-500">
              If your refund does not appear after the stated duration, please contact your issuing bank referencing the RRN/transaction ID provided in our confirmation email.
            </p>
          </section>

          {/* 4. Deductions */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              4. Deductions &amp; Fee Offsets
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>
                <strong className="text-neutral-800">Change-of-Mind Returns:</strong> A nominal ₹150 logistics fee is deducted to cover reverse shipping and transit insurance.
              </li>
              <li>
                <strong className="text-neutral-800">COD Fees:</strong> Cash-on-delivery handling fees collected by courier partners are non-refundable.
              </li>
              <li>
                <strong className="text-neutral-800">Missing Gifts / Packaging:</strong> The market value of any unreturned promotional gifts or gem certificates will be subtracted from the refund balance.
              </li>
              <li>
                <strong className="text-neutral-800">Zero Deductions:</strong> No deductions whatsoever apply if an item arrived damaged, flawed, or incorrect on our part.
              </li>
            </ul>
          </section>

          {/* 5. Store Credit */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              5. Store Credit Option
            </h2>
            <p>
              Customers may alternatively select instant <strong className="text-neutral-900">BridesBerry Store Credit</strong>. Store credit is activated immediately upon return approval, carries no expiration date, and can be redeemed seamlessly toward any future jewelry collection purchase.
            </p>
          </section>

          {/* 6. Order Cancellations */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              6. Order Cancellations
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>
                <strong className="text-neutral-800">Before Dispatch:</strong> You may cancel any ready catalog order via &quot;My Orders&quot; or by emailing support before courier dispatch. You will receive a 100% full refund with zero cancellation charges.
              </li>
              <li>
                <strong className="text-neutral-800">After Dispatch:</strong> Shipped parcels cannot be recalled in transit; please receive the parcel and initiate a standard return request.
              </li>
              <li>
                <strong className="text-neutral-800">Customised Orders:</strong> Made-to-order and engraved items cannot be cancelled once manufacturing commences in the atelier.
              </li>
            </ul>
          </section>

          {/* 7. Failed or Double Payments */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              7. Failed or Duplicate Transactions
            </h2>
            <p>
              If funds are debited from your bank account during checkout but no order confirmation is generated, or if an accidental double-charge occurs, the payment gateway typically auto-reconciles and reverses the debit within 5 to 7 business days. If it does not reflect, please forward your payment gateway transaction reference ID to <a href="mailto:rootmentsit@gmail.com" className="text-[#8C6A16] underline font-medium">rootmentsit@gmail.com</a> for manual reconciliation.
            </p>
          </section>

          {/* 8. Discounts and Promotional Coupons */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              8. Promotional Offers &amp; Coupons
            </h2>
            <p>
              Refund calculations are based strictly on the net amount paid by the customer after all applied promotional coupons, bundle discounts, or vouchers. Coupon values are not convertible into cash refunds.
            </p>
          </section>

          {/* 9. Contact */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              9. Contact Accounts &amp; Billing
            </h2>
            <p>
              For questions regarding pending refunds or financial status, contact our billing desk at{" "}
              <a href="mailto:rootmentsit@gmail.com" className="text-[#8C6A16] font-semibold underline">
                rootmentsit@gmail.com
              </a>.
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
            <Link href="/return-policy" className="hover:text-[#310C13] underline">Return Policy</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

