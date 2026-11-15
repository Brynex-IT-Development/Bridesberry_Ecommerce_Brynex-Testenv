"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "Christian Wedding",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 text-left">
      {/* Header */}
      <div className="w-full px-[6.5%] mx-auto max-w-none pb-12 sm:pb-16 border-b border-neutral-150">
        <div className="max-w-3xl">
          <span
            style={{
              fontFamily: "var(--font-stack-text), 'Stack Sans Text', sans-serif",
              letterSpacing: "0.22em",
            }}
            className="text-[11px] sm:text-xs uppercase text-[#B78924] font-medium block mb-3"
          >
            Get In Touch
          </span>
          <h1
            style={{
              fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', sans-serif",
              fontWeight: 200,
              fontSize: "clamp(34px, 4.5vw, 60px)",
              lineHeight: "108%",
              letterSpacing: "0%",
            }}
            className="text-neutral-900 uppercase"
          >
            Contact &amp; Bridal
            <br />
            Appointments
          </h1>
          <p className="mt-5 text-sm sm:text-base text-neutral-600 font-questrial leading-relaxed max-w-2xl">
            Whether you need custom styling advice, matching accessories for your bridal attire, or want to schedule an in-person viewing, our bridal concierges are at your service.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Details & Right Appointment Form */}
      <div className="w-full px-[6.5%] mx-auto max-w-none pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Information & Studio Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h2
                style={{
                  fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', sans-serif",
                  fontWeight: 300,
                  fontSize: "24px",
                }}
                className="text-[#310C13]"
              >
                Brides Berry Studio
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-questrial leading-relaxed">
                Experience our curated bridal pieces in person. Appointments ensure private access to our complete collection and 1-on-1 styling guidance.
              </p>
            </div>

            <div className="space-y-5 text-xs sm:text-sm font-questrial text-neutral-700">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-[#B78924] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-medium">Registered Office &amp; Studio</strong>
                  <p className="text-neutral-600">MG Road, Ernakulam, Kerala, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-[#B78924] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-medium">Email Support</strong>
                  <a href="mailto:rootmentsit@gmail.com" className="text-neutral-600 hover:text-[#B78924] transition-colors">
                    rootmentsit@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-4 h-4 text-[#B78924] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-medium">Direct Concierge / WhatsApp</strong>
                  <a href="tel:+917025743212" className="text-neutral-600 hover:text-[#B78924] transition-colors">
                    +91 70257 43212
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-4 h-4 text-[#B78924] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-medium">Opening Hours</strong>
                  <p className="text-neutral-600">Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
                  <p className="text-neutral-400 text-[11px]">Sunday: By Appointment Only</p>
                </div>
              </div>
            </div>

            {/* Quick Link Card */}
            <div className="bg-[#FAF7F2] p-6 border border-[#E8DBB4]/80 rounded-sm space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#B78924] font-medium block">
                Order Tracking &amp; Inquiries
              </span>
              <p className="text-xs text-neutral-600 font-questrial leading-relaxed">
                Already placed an order? You can track your shipment live or review policy details:
              </p>
              <div className="pt-1 flex flex-wrap gap-4 text-xs font-questrial">
                <Link href="/shipping-policy" className="text-[#310C13] hover:underline font-medium">
                  Shipping Policy &rarr;
                </Link>
                <Link href="/faqs" className="text-[#310C13] hover:underline font-medium">
                  Frequently Asked Questions &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Booking Form */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 sm:p-10 shadow-2xs">
            <h3
              style={{
                fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', sans-serif",
                fontWeight: 300,
                fontSize: "22px",
              }}
              className="text-neutral-900 mb-2"
            >
              Request a Bridal Styling Consultation
            </h3>
            <p className="text-xs text-neutral-500 font-questrial mb-6">
              Fill in your details below and our stylist will reach out within 24 hours to confirm your date and time.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-raleway text-lg font-medium text-neutral-900">
                  Consultation Request Received
                </h4>
                <p className="text-xs text-neutral-600 font-questrial max-w-sm mx-auto">
                  Thank you, {formData.name}. Our bridal coordinator will contact you via WhatsApp or email shortly to confirm your slot.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-questrial text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anjali Nair"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-[#310C13] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anjali@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-[#310C13] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      Phone / WhatsApp Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-[#310C13] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      Wedding / Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-[#310C13] transition-colors text-neutral-700 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Occasion / Wedding Ceremony Type
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-[#310C13] transition-colors text-neutral-700 bg-white"
                  >
                    <option value="Christian Wedding">Christian Wedding (Gown &amp; Veil)</option>
                    <option value="Hindu Traditional Wedding">Hindu Traditional (Kasavu / Kanjeevaram Saree)</option>
                    <option value="Nikah Ceremony">Nikah Ceremony &amp; Reception</option>
                    <option value="Reception / Sangeet">Reception / Sangeet / Mehendi</option>
                    <option value="Bridesmaid Accessories">Bridesmaid Accessories &amp; Gifting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Special Requests or Questions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your outfit neckline, preferred jewelry type, or any custom requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-none focus:outline-none focus:border-[#310C13] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#310C13] hover:bg-[#4a101a] text-white uppercase text-[11px] font-medium tracking-[0.16em] transition-colors cursor-pointer"
                >
                  Submit Appointment Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

