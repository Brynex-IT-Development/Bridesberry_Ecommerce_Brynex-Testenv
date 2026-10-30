import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | BridesBerry",
  description: "Privacy policy for BridesBerry, operated by Brynex Apparels Pvt Ltd.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-neutral-800 pt-24 sm:pt-28 pb-16 font-sans">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-xs font-questrial text-neutral-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#310C13] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#C99213] font-medium">Privacy Policy</span>
        </nav>

        {/* Page Header */}
        <header className="mb-10 pb-8 border-b border-neutral-200">
          <div className="inline-block bg-[#FBF7ED] text-[#8C6A16] border border-[#E8DBB4] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Legal &amp; Data Protection
          </div>
          <h1
            style={{
              fontFamily: "'Abhaya Libre', Georgia, serif",
              fontWeight: 600,
            }}
            className="text-3xl sm:text-4xl md:text-5xl text-[#310C13] tracking-tight mb-3"
          >
            Privacy Policy
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
              Introduction
            </h2>
            <p>
              <strong className="text-neutral-900">BridesBerry</strong>, operated by <strong className="text-neutral-900">Brynex Apparels Pvt Ltd</strong>, registered at <strong className="text-neutral-900">37/3688A3, Harikeerthi Complex, Edapally, Ernakulam, Kerala - 682024</strong>, respects your privacy. This policy explains what personal information we collect, why we collect it, and how we protect it. By using our website or placing an order, you agree to this policy.
            </p>
          </section>

          {/* Section 1: Information we collect */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>
                <strong className="text-neutral-800">Details you give us:</strong> Your name, email, phone number, billing and delivery address, and your date of birth or wedding anniversary if you choose to share them for special celebrations or offers.
              </li>
              <li>
                <strong className="text-neutral-800">Order details:</strong> The jewelry pieces you buy, ring or bangle sizes, order history, and returns. For high-value purchases, we may collect your PAN or Government ID where Indian law mandates it.
              </li>
              <li>
                <strong className="text-neutral-800">Payment information:</strong> Payments are processed via encrypted, RBI-compliant third-party payment gateways (e.g., PhonePe, Razorpay). We do not store or have access to your full credit/debit card numbers, CVV, UPI PIN, or net banking passwords.
              </li>
              <li>
                <strong className="text-neutral-800">Technical information:</strong> Your IP address, device type, operating system, browser type, pages visited, and cookies to enhance browsing stability.
              </li>
              <li>
                <strong className="text-neutral-800">Communication:</strong> Messages, feedback, photos, or unboxing videos you send to our concierge support team for enquiries or returns.
              </li>
            </ul>
          </section>

          {/* Section 2: How we use your information */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>To process and safely deliver your jewelry orders, and handle returns, replacements, and refunds.</li>
              <li>To verify your identity and prevent fraudulent activities, especially on high-value precious jewelry orders.</li>
              <li>To contact you regarding order confirmations, dispatch updates, OTP verifications, or customer support queries.</li>
              <li>To send curated bridal offers, new collection announcements, and styling guides (only when you have consented; you may opt out at any time).</li>
              <li>To maintain our website security and enhance your shopping experience.</li>
              <li>To fulfill statutory, legal, tax, and GST invoicing obligations under Indian law.</li>
            </ul>
          </section>

          {/* Section 3: Cookies */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              3. Cookies
            </h2>
            <p>
              We use essential cookies to keep you signed in, remember your cart selections, and understand how visitors explore our collections. You can choose to turn off cookies in your browser settings, though certain interactive features of the store may not function optimally as a result.
            </p>
          </section>

          {/* Section 4: Who we share your information with */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              4. Who We Share Your Information With
            </h2>
            <p>
              We do <strong className="text-neutral-900">not</strong> sell or rent your personal information to third parties. We share information only with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>
                <strong className="text-neutral-800">Courier and logistics partners (e.g., Shiprocket):</strong> To facilitate insured, OTP-verified delivery of your jewelry parcel.
              </li>
              <li>
                <strong className="text-neutral-800">Payment gateways &amp; banking institutions:</strong> To securely process payments and credit refunds directly.
              </li>
              <li>
                <strong className="text-neutral-800">Operational service providers:</strong> Secure cloud infrastructure (AWS), transactional SMS, and email services operating under strict non-disclosure obligations.
              </li>
              <li>
                <strong className="text-neutral-800">Statutory and legal authorities:</strong> When mandated by court order, Indian taxation authorities, or lawful enforcement requests.
              </li>
              <li>
                <strong className="text-neutral-800">Business transfers:</strong> In the event of a merger, acquisition, or restructuring of Brynex Apparels Pvt Ltd, with prior notification to you.
              </li>
            </ul>
          </section>

          {/* Section 5: Data Retention */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              5. How Long We Keep Your Information
            </h2>
            <p>
              We retain your personal details only as long as necessary to fulfill the services outlined above or to comply with statutory legal and tax audit periods (such as retaining tax invoices and transaction records under GST and Companies Act). Once those requirements lapse, data is permanently erased or anonymized.
            </p>
          </section>

          {/* Section 6: Security */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              6. How We Protect Your Information
            </h2>
            <p>
              We deploy industry-standard technical and procedural safeguards, including end-to-end 256-bit SSL/HTTPS encryption, role-based access restrictions, and certified payment partners. While no digital platform is invulnerable, we take every reasonable measure to protect your confidential information.
            </p>
          </section>

          {/* Section 7: Your Rights */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              7. Your Rights
            </h2>
            <p>Under applicable Indian data protection principles, you may:</p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>Request a copy of the personal information we hold about you.</li>
              <li>Request correction or rectification of incomplete or inaccurate records.</li>
              <li>Request deletion of your non-statutory data where legal retention is not mandatory.</li>
              <li>Opt out of promotional communications at any time via the &quot;unsubscribe&quot; link or by contacting us.</li>
              <li>Withdraw any consent previously provided.</li>
            </ul>
            <p className="text-xs text-neutral-500 pt-1">
              To exercise these rights, please email us. We verify the identity of the account holder and respond within 30 days.
            </p>
          </section>

          {/* Section 8: Children */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              8. Children&apos;s Privacy
            </h2>
            <p>
              Our website is intended exclusively for adults aged 18 or above. We do not knowingly solicit or collect data from minors. If you believe a minor has submitted personal details, please notify us immediately for swift removal.
            </p>
          </section>

          {/* Section 9: Third-Party Links */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              9. Third-Party Links
            </h2>
            <p>
              Our website may link to third-party services (such as delivery tracking partners or social media platforms). We are not responsible for the privacy practices of external platforms, and we encourage you to review their respective policies.
            </p>
          </section>

          {/* Section 10: Changes to this Policy */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our legal obligations or operational workflows. Any revisions will be published on this page with an updated &quot;Last Updated&quot; date. Continued use of BridesBerry signifies your acceptance of updated terms.
            </p>
          </section>

          {/* Section 11: Grievance Officer & Contact Us */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DBB4] shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#310C13] font-sans">
              11. Grievance Officer &amp; Contact Us
            </h2>
            <p>
              In accordance with the Information Technology Act, 2000 and rules made thereunder, for privacy questions, requests, or complaints, please contact our designated Grievance Officer:
            </p>
            <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8DBB4]/60 space-y-2 text-sm text-neutral-800">
              <p><strong className="text-neutral-900">Entity:</strong> Brynex Apparels Pvt Ltd (BridesBerry)</p>
              <p><strong className="text-neutral-900">Designation:</strong> Grievance Officer / Customer Privacy Desk</p>
              <p>
                <strong className="text-neutral-900">Email:</strong>{" "}
                <a href="mailto:rootmentsit@gmail.com" className="text-[#8C6A16] hover:underline font-medium">
                  rootmentsit@gmail.com
                </a>
              </p>
              <p><strong className="text-neutral-900">Operating Hours:</strong> Monday – Saturday (10:00 AM – 6:00 PM IST)</p>
              <p><strong className="text-neutral-900">Registered Office:</strong> 37/3688A3, Harikeerthi Complex, Edapally, Ernakulam, Kerala - 682024, India</p>
            </div>
            <p className="text-xs text-neutral-500">
              We acknowledge grievances within 48 hours and strive to resolve inquiries within one month.
            </p>
          </section>

        </article>

        {/* Footer Navigation Back to Policies */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs font-questrial text-neutral-500">
          <Link href="/" className="text-[#310C13] hover:underline font-medium">
            &larr; Back to BridesBerry Home
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/terms-and-conditions" className="hover:text-[#310C13] underline">Terms &amp; Conditions</Link>
            <Link href="/shipping-policy" className="hover:text-[#310C13] underline">Shipping Policy</Link>
            <Link href="/return-policy" className="hover:text-[#310C13] underline">Return Policy</Link>
            <Link href="/refund-policy" className="hover:text-[#310C13] underline">Refund Policy</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
