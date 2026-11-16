'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Calendar, ChevronDown } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

export default function ProfileDrawer() {
  const router = useRouter();
  const { profile, updateProfile, isDrawerOpen, closeDrawer } = useProfile();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<'Female' | 'Male' | 'Prefer not to say'>('Female');
  const [birthday, setBirthday] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setGender(profile.gender || 'Female');
      setBirthday(profile.birthday || '');
      setMobileNumber(profile.mobileNumber || '');
    }
  }, [isDrawerOpen, profile]);

  if (!isDrawerOpen) return null;

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await updateProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender,
      birthday: birthday.trim(),
      mobileNumber: mobileNumber.trim(),
    });
    closeDrawer();
    router.push('/account');
  };

  const handleSkip = () => {
    closeDrawer();
    router.push('/account');
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={closeDrawer}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6">
        <div className="w-screen max-w-[460px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
          {/* Top navigation bar */}
          <div className="flex items-center justify-between px-7 pt-6 pb-2">
            <button
              type="button"
              onClick={closeDrawer}
              className="text-neutral-700 hover:text-black p-1 -ml-1 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="text-[#C59B27] font-semibold text-xs tracking-wider uppercase hover:opacity-80 transition-opacity cursor-pointer"
            >
              SKIP
            </button>
          </div>

          {/* Drawer content */}
          <div className="flex-1 overflow-y-auto px-7 py-4">
            <h2
              className="text-neutral-900 mt-2 mb-8 tracking-normal"
              style={{
                fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', sans-serif",
                fontWeight: 200,
                fontSize: '32px',
                lineHeight: '100%',
                letterSpacing: '0%',
              }}
            >
              Tell us little more about you
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-[#C59B27] tracking-wider mb-1.5 uppercase">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full border border-neutral-300 rounded px-3 py-2.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#310C13] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#C59B27] tracking-wider mb-1.5 uppercase">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full border border-neutral-300 rounded px-3 py-2.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#310C13] transition-colors"
                  />
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['Female', 'Male', 'Prefer not to say'] as const).map((opt) => {
                    const isSelected = gender === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setGender(opt)}
                        className={`py-2 px-2 text-xs rounded border transition-colors text-center cursor-pointer ${
                          isSelected
                            ? 'border-[#C59B27] text-[#C59B27] font-medium bg-white ring-1 ring-[#C59B27]'
                            : 'border-neutral-300 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 bg-white'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Birthday */}
              <div>
                <label className="block text-[11px] font-medium text-[#C59B27] tracking-wider mb-1.5 uppercase">
                  Birthday
                </label>
                <div className="relative flex items-center border border-neutral-300 rounded px-3 py-2.5 bg-white focus-within:border-[#310C13] transition-colors">
                  <input
                    type="text"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                  />
                  <Calendar className="w-4 h-4 text-neutral-400 pointer-events-none flex-shrink-0" />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-[11px] font-medium text-[#C59B27] tracking-wider mb-1.5 uppercase">
                  Mobile Number
                </label>
                <div className="flex items-center border border-neutral-300 rounded px-3 py-2.5 bg-white focus-within:border-[#310C13] transition-colors text-xs">
                  <div className="flex items-center gap-1 text-neutral-700 font-medium pr-2.5 select-none">
                    <span>+91</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                  </div>
                  <span className="text-neutral-300 select-none mr-2.5">|</span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Mobile number"
                    className="flex-1 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleVerify}
                    className="text-[#C59B27] font-medium text-xs hover:opacity-85 transition-opacity cursor-pointer pl-2 whitespace-nowrap"
                  >
                    {isVerified ? (
                      <span className="text-emerald-600 font-semibold">Verified</span>
                    ) : isVerifying ? (
                      'Sending...'
                    ) : (
                      'Verify'
                    )}
                  </button>
                </div>
              </div>

              {/* Save Details Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#310C13] hover:bg-[#4a101a] text-white py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer"
                >
                  SAVE DETAILS
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
