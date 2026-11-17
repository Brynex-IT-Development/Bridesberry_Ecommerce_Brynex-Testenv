'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Home,
  MapPin,
  Calendar,
  ChevronDown,
  Edit3,
  Search,
  Check,
  Plus,
  Trash2,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import { getMyOrders } from '../../services/orders.service';
import {
  getCustomerAddresses,
  addCustomerAddress,
  deleteCustomerAddress,
  CustomerAddressItem,
} from '../../services/address.service';

type AccountTab =
  | 'profile'
  | 'orders'
  | 'wishlist'
  | 'addresses'
  | 'payment'
  | 'settings';

type OrderStatusFilter =
  | 'ALL ORDERS'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

interface RealOrderItem {
  title: string;
  image: string;
  quantity: number;
  price: number;
}

interface RealUserOrder {
  id: string;
  orderNumber: string;
  placedDate: string;
  status: string;
  total: number;
  items: RealOrderItem[];
}

const headlineStyle: React.CSSProperties = {
  fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', sans-serif",
  fontWeight: 200,
  fontSize: '32px',
  lineHeight: '100%',
  letterSpacing: '0%',
};

const sideOptionStyle: React.CSSProperties = {
  fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', sans-serif",
  fontWeight: 300,
  fontSize: '14px',
  lineHeight: '100%',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
};

// Exact Figma Icons matching Figma design
function FigmaProfileIcon({ className = "w-5 h-5", stroke = "#B78924" }: { className?: string; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="7" r="4.25" />
      <ellipse cx="12" cy="17.25" rx="6.75" ry="4.25" />
    </svg>
  );
}

function FigmaOrdersIcon({ className = "w-5 h-5", stroke = "#B78924" }: { className?: string; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  );
}

function FigmaWishlistIcon({ className = "w-5 h-5", stroke = "#B78924" }: { className?: string; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function FigmaAddressesIcon({ className = "w-5 h-5", stroke = "#B78924" }: { className?: string; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function FigmaPaymentIcon({ className = "w-5 h-5", stroke = "#B78924" }: { className?: string; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

function FigmaSettingsIcon({ className = "w-5 h-5", stroke = "#B78924" }: { className?: string; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FigmaChevronRight({ className = "w-4 h-4", stroke = "#1F1F1F" }: { className?: string; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as AccountTab | null;

  const { user, logout, forgotPassword, resetPassword } = useAuth();
  const { profile, updateProfile } = useProfile();

  const [activeTab, setActiveTab] = useState<AccountTab>(tabParam || 'profile');
  const [orderFilter, setOrderFilter] = useState<OrderStatusFilter>('ALL ORDERS');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<RealUserOrder[]>([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<RealUserOrder | null>(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [addresses, setAddresses] = useState<CustomerAddressItem[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Password change via Email OTP state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordOtp, setPasswordOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Profile form state (initialized to Lakshmi matching design, synced with real user if present)
  const [firstName, setFirstName] = useState(user?.firstName || profile.firstName || 'LAKSHMI');
  const [lastName, setLastName] = useState(user?.lastName || profile.lastName || 'K M');
  const [gender, setGender] = useState<'Female' | 'Male' | 'Prefer not to say'>(profile.gender || 'Female');
  const [birthday, setBirthday] = useState(profile.birthday || '13/08/2003');
  const [mobileNumber, setMobileNumber] = useState(profile.mobileNumber || '98765 43210');
  const [isSaving, setIsSaving] = useState(false);

  // Address modal state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    type: 'SHIPPING',
  });

  // Sync active tab from URL param if it changes
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Sync profile data from real authenticated user
  useEffect(() => {
    setFirstName(user?.firstName || profile.firstName || 'LAKSHMI');
    setLastName(user?.lastName || profile.lastName || 'K M');
    setGender(profile.gender || 'Female');
    setBirthday(profile.birthday || '13/08/2003');
    setMobileNumber(profile.mobileNumber || '98765 43210');
  }, [user, profile]);

  // Load real orders from backend
  useEffect(() => {
    let isMounted = true;
    setLoadingOrders(true);

    getMyOrders()
      .then((rawOrders: any[]) => {
        if (!isMounted) return;
        if (Array.isArray(rawOrders)) {
          const parsedOrders: RealUserOrder[] = rawOrders.map((ro) => {
            const rawStatus = (ro.status || 'PROCESSING').toUpperCase();
            let displayStatus = 'Processing';
            if (rawStatus === 'DELIVERED') displayStatus = 'Delivered';
            else if (rawStatus === 'SHIPPED') displayStatus = 'Shipped';
            else if (rawStatus === 'CANCELLED') displayStatus = 'Cancelled';
            else if (rawStatus === 'CONFIRMED' || rawStatus === 'PACKED') displayStatus = 'Processing';

            const items: RealOrderItem[] = Array.isArray(ro.items)
              ? ro.items.map((it: any) => ({
                  title: it.name || it.product?.name || 'Bridal Jewelry Item',
                  image:
                    it.product?.images?.find((img: any) => img.isPrimary)?.url ||
                    it.product?.images?.[0]?.url ||
                    '/cat_necklace_layered.png',
                  quantity: it.quantity || 1,
                  price: Number(it.price || 0),
                }))
              : [];

            const placedDate = ro.createdAt
              ? new Date(ro.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Recent';

            return {
              id: ro.id,
              orderNumber: ro.orderNumber || ro.id.substring(0, 8).toUpperCase(),
              placedDate,
              status: displayStatus,
              total: Number(ro.total || 0),
              items,
            };
          });

          setOrders(parsedOrders);
        } else {
          setOrders([]);
        }
      })
      .catch((err) => {
        console.error('Failed to load orders from backend:', err);
        setOrders([]);
      })
      .finally(() => {
        if (isMounted) setLoadingOrders(false);
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Load real addresses from backend
  const loadAddresses = () => {
    setLoadingAddresses(true);
    getCustomerAddresses()
      .then((data) => {
        setAddresses(data);
      })
      .catch((err) => {
        console.error('Failed to load addresses:', err);
        setAddresses([]);
      })
      .finally(() => {
        setLoadingAddresses(false);
      });
  };

  useEffect(() => {
    if (activeTab === 'addresses') {
      loadAddresses();
    }
  }, [activeTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveProfile = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        gender,
        birthday: birthday.trim(),
        mobileNumber: mobileNumber.trim(),
      });
      showToast('Profile details updated successfully');
    } catch {
      showToast('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleSendOtp = async () => {
    const targetEmail = user?.email || profile.email;
    if (!targetEmail) {
      setPasswordError('No email address found for your account.');
      return;
    }
    setIsSendingOtp(true);
    setPasswordError(null);
    try {
      await forgotPassword(targetEmail);
      setOtpSent(true);
      setCooldown(60);
      showToast(`Verification code sent to ${targetEmail}`);
    } catch (err: any) {
      console.error('Failed to send password reset OTP:', err);
      setPasswordError(err?.message || 'Failed to send verification code. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = user?.email || profile.email;
    if (!targetEmail) {
      setPasswordError('No email address found for your account.');
      return;
    }
    if (!passwordOtp || passwordOtp.trim().length !== 6) {
      setPasswordError('Please enter the 6-digit OTP code sent to your email.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setIsResettingPassword(true);
    setPasswordError(null);
    try {
      await resetPassword(targetEmail, passwordOtp.trim(), newPassword);
      showToast('Password updated successfully!');
      setShowPasswordChange(false);
      setPasswordOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setOtpSent(false);
    } catch (err: any) {
      console.error('Failed to reset password:', err);
      setPasswordError(err?.message || 'Invalid or expired OTP code. Please check and try again.');
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.street1 || !newAddress.city) {
      showToast('Please fill in required address fields');
      return;
    }
    setIsAddingAddress(true);
    try {
      const created = await addCustomerAddress({
        street1: newAddress.street1.trim(),
        street2: newAddress.street2.trim() || undefined,
        city: newAddress.city.trim(),
        state: newAddress.state.trim() || 'Kerala',
        zipCode: newAddress.zipCode.trim() || '682001',
        country: 'India',
        phone: newAddress.phone.trim() || undefined,
        type: newAddress.type,
      });
      if (created) {
        showToast('Address added successfully');
        setShowAddressModal(false);
        setNewAddress({
          street1: '',
          street2: '',
          city: '',
          state: '',
          zipCode: '',
          phone: '',
          type: 'SHIPPING',
        });
        loadAddresses();
      } else {
        showToast('Failed to add address');
      }
    } catch {
      showToast('Error adding address');
    } finally {
      setIsAddingAddress(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    try {
      await deleteCustomerAddress(id);
      showToast('Address deleted');
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch {
      showToast('Failed to delete address');
    }
  };

  // Filter orders by tab and search
  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      orderFilter === 'ALL ORDERS' ||
      order.status.toUpperCase() === orderFilter;

    const matchesSearch =
      searchQuery.trim() === '' ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesFilter && matchesSearch;
  });

  const displayName = user?.firstName
    ? `${user.firstName.charAt(0).toUpperCase()}${user.firstName.slice(1)}`
    : profile.firstName
    ? `${profile.firstName.charAt(0).toUpperCase()}${profile.firstName.slice(1)}`
    : 'Lakshmi';

  const displayEmail = user?.email || profile.email || 'lakshmikm@gmail.com';

  const navItems = [
    { id: 'profile' as const, label: 'MY PROFILE', icon: FigmaProfileIcon },
    { id: 'orders' as const, label: 'MY ORDERS', icon: FigmaOrdersIcon },
    { id: 'wishlist' as const, label: 'MY WISHLIST', icon: FigmaWishlistIcon },
    { id: 'addresses' as const, label: 'SAVED ADDRESSES', icon: FigmaAddressesIcon },
    { id: 'payment' as const, label: 'PAYMENT METHODS', icon: FigmaPaymentIcon },
    { id: 'settings' as const, label: 'ACCOUNT SETTINGS', icon: FigmaSettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-neutral-800 pt-24 md:pt-28 pb-16 md:pb-24">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#310C13] text-white px-5 py-3 rounded shadow-lg text-xs flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* Breadcrumb matching Image 2, 3, 4: Home > Account > My Profile */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-light mb-5 md:mb-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-neutral-700 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-neutral-400" />
            <span>Home</span>
          </Link>
          <span className="text-neutral-300">&gt;</span>
          <Link
            href="/account"
            className="hover:text-neutral-700 transition-colors"
          >
            Account
          </Link>
          <span className="text-neutral-300">&gt;</span>
          <span className="text-[#C59B27] font-normal">
            {activeTab === 'profile'
              ? 'My Profile'
              : activeTab === 'orders'
              ? 'My Profile'
              : navItems.find((n) => n.id === activeTab)?.label || 'My Profile'}
          </span>
        </div>

        {/* Main 2-Column White Container Card */}
        <div className="bg-white border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] grid grid-cols-1 md:grid-cols-[300px_1fr] min-h-[580px]">
          {/* Left Sidebar */}
          <div className="border-b md:border-b-0 md:border-r border-neutral-200/80 p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* User greeting matching screenshot */}
              <div className="mb-6">
                <h3 className="text-[22px] font-bold text-[#310C13] tracking-tight">
                  Hello, {displayName}
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-1 truncate">
                  {displayEmail}
                </p>
              </div>

              {/* Navigation Menu with exact Figma styling and icons */}
              <nav className="mt-6 flex flex-col">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <div
                      key={item.id}
                      className="border-b border-neutral-200/80 py-1"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between py-3.5 px-3 rounded-[2px] transition-colors cursor-pointer text-left ${
                          isActive
                            ? 'bg-[#310C13] text-white'
                            : 'text-[#1E1E1E] hover:text-[#B78924] bg-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <Icon
                            className="w-5 h-5 flex-shrink-0"
                            stroke="#B78924"
                          />
                          <span style={sideOptionStyle}>{item.label}</span>
                        </div>
                        <FigmaChevronRight
                          className="w-4 h-4 flex-shrink-0"
                          stroke={isActive ? '#FFFFFF' : '#1E1E1E'}
                        />
                      </button>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Logout Button matching Figma */}
            <div className="pt-8 md:pt-12">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-[#FEECEC] text-[#EF4444] hover:bg-[#fedcdc] font-normal text-center py-3.5 uppercase text-xs tracking-wider transition-colors cursor-pointer block rounded-[2px]"
              >
                LOG OUT
              </button>
            </div>
          </div>

          {/* Right Main Content Panel */}
          <div className="p-6 md:p-10 flex flex-col">
            {/* TAB 1: MY PROFILE (Real profile data synchronized with database) */}
            {activeTab === 'profile' && (
              <div>
                {/* Heading row */}
                <div className="flex items-center justify-between pb-6 mb-2">
                  <h1
                    className="text-neutral-900 tracking-normal"
                    style={headlineStyle}
                  >
                    My Profile
                  </h1>
                  <span className="text-[#C59B27] flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
                    <span>EDIT PROFILE</span>
                    <Edit3 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Profile Form matching screenshot exactly */}
                <form onSubmit={handleSaveProfile} className="space-y-6 w-full mt-6">
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#C59B27] tracking-wider mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full border border-neutral-300 rounded-[2px] px-4 py-3 text-xs md:text-sm font-semibold text-neutral-800 tracking-wider placeholder:text-neutral-400 focus:outline-none focus:border-[#310C13] transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#C59B27] tracking-wider mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full border border-neutral-300 rounded-[2px] px-4 py-3 text-xs md:text-sm font-semibold text-neutral-800 tracking-wider placeholder:text-neutral-400 focus:outline-none focus:border-[#310C13] transition-colors bg-white"
                      />
                    </div>
                  </div>

                  {/* Gender selection */}
                  <div>
                    <div className="flex flex-wrap gap-2.5">
                      {(['Female', 'Male', 'Prefer not to say'] as const).map(
                        (opt) => {
                          const isSelected = gender === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setGender(opt)}
                              className={`py-2 px-6 text-xs rounded-[2px] border transition-colors text-center cursor-pointer ${
                                isSelected
                                  ? 'border-[#C59B27] text-[#C59B27] font-medium bg-white ring-1 ring-[#C59B27]'
                                  : 'border-neutral-300 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 bg-white'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Birthday */}
                  <div>
                    <label className="block text-xs font-medium text-[#C59B27] tracking-wider mb-2">
                      Birthday
                    </label>
                    <div className="relative flex items-center border border-neutral-300 rounded-[2px] px-4 py-3 bg-white focus-within:border-[#310C13] transition-colors">
                      <input
                        type="text"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        placeholder="DD/MM/YYYY"
                        className="w-full text-xs md:text-sm font-semibold text-neutral-800 tracking-wider placeholder:text-neutral-400 focus:outline-none bg-transparent"
                      />
                      <Calendar className="w-4 h-4 text-neutral-400 pointer-events-none flex-shrink-0" />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-medium text-[#C59B27] tracking-wider mb-2">
                      Mobile Number
                    </label>
                    <div className="flex items-center border border-neutral-300 rounded-[2px] px-4 py-3 bg-white focus-within:border-[#310C13] transition-colors text-xs md:text-sm">
                      <div className="flex items-center gap-1 text-neutral-800 font-semibold pr-3 select-none">
                        <span>+91</span>
                        <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                      </div>
                      <span className="text-neutral-300 select-none mr-3">|</span>
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Mobile number"
                        className="flex-1 text-xs md:text-sm font-semibold text-neutral-800 tracking-wider placeholder:text-neutral-400 focus:outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Save Details Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-[#310C13] hover:bg-[#4a101a] disabled:opacity-60 text-white py-3.5 px-10 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 rounded-[2px]"
                    >
                      {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>SAVE DETAILS</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: MY ORDERS (Real customer orders from backend) */}
            {activeTab === 'orders' && (
              <div>
                {/* Header row: Title + Search bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
                  <h1
                    className="text-neutral-900 tracking-normal"
                    style={headlineStyle}
                  >
                    My Profile
                  </h1>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-56">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search"
                      className="w-full border border-neutral-300 rounded px-3 py-1.5 pl-8 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#310C13]"
                    />
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 pt-2 pb-6">
                  {(
                    [
                      'ALL ORDERS',
                      'PROCESSING',
                      'SHIPPED',
                      'DELIVERED',
                      'CANCELLED',
                    ] as OrderStatusFilter[]
                  ).map((status) => {
                    const isSelected = orderFilter === status;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setOrderFilter(status)}
                        className={`text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-none border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#310C13] text-white border-[#310C13]'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50'
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>

                {/* Orders Content */}
                {loadingOrders ? (
                  <div className="py-16 text-center text-xs text-neutral-400 font-light flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#C59B27]" />
                    <span>Loading your orders...</span>
                  </div>
                ) : filteredOrders.length > 0 ? (
                  <div className="space-y-6">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-neutral-200/90 rounded-none p-5 sm:p-6 bg-white space-y-4"
                      >
                        {/* Order Header */}
                        <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
                          <div>
                            <button
                              type="button"
                              onClick={() => setSelectedOrderDetails(order)}
                              className="text-sm font-bold text-neutral-900 tracking-wide uppercase hover:text-[#C59B27] cursor-pointer text-left transition-colors flex items-center gap-2"
                              title="Click to view order product details"
                            >
                              <span>ORDER #{order.orderNumber}</span>
                              <span className="text-[10px] text-[#C59B27] lowercase font-normal">(view details)</span>
                            </button>
                            <p className="text-xs text-neutral-400 font-light mt-0.5">
                              Placed on {order.placedDate}
                            </p>
                          </div>
                          <span
                            className={`text-xs font-medium px-3.5 py-1 rounded-full ${
                              order.status === 'Delivered'
                                ? 'bg-[#E7F8EC] text-[#22C55E]'
                                : order.status === 'Shipped'
                                ? 'bg-sky-50 text-sky-600'
                                : order.status === 'Cancelled'
                                ? 'bg-rose-50 text-rose-600'
                                : 'bg-amber-50 text-amber-600'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* Order Items */}
                        <div className="divide-y divide-neutral-100 space-y-4">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-4 pt-4 first:pt-0"
                            >
                              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-100 rounded-none overflow-hidden relative flex-shrink-0 border border-neutral-100">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  sizes="80px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-semibold text-neutral-800 leading-snug line-clamp-2">
                                  {item.title}
                                </h5>
                                <p className="text-xs text-neutral-400 font-light mt-1">
                                  Qty: {item.quantity}
                                </p>
                                <p className="text-xs font-semibold text-neutral-900 mt-1">
                                  ₹{item.price.toLocaleString('en-IN')}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Total and Action Buttons */}
                        <div className="pt-2 border-t border-neutral-100">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold tracking-wider text-neutral-800 uppercase">
                              TOTAL
                            </span>
                            <span className="text-base font-bold text-neutral-900">
                              ₹{order.total.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setSelectedOrderDetails(order)}
                              className="border border-neutral-800 text-neutral-900 text-xs font-semibold px-5 py-2.5 uppercase tracking-wider hover:bg-neutral-50 transition-colors inline-block cursor-pointer"
                            >
                              VIEW DETAILS
                            </button>
                            <Link
                              href="/shop"
                              className="bg-[#310C13] hover:bg-[#4a101a] text-white text-xs font-semibold px-6 py-2.5 uppercase tracking-wider transition-colors inline-block"
                            >
                              BUY AGAIN
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* CUSTOMER ORDER PRODUCT DETAILS MODAL */}
                    {selectedOrderDetails && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                        <div className="bg-white border border-neutral-200 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left">
                          {/* Modal Header */}
                          <div className="flex items-start justify-between border-b border-neutral-100 pb-4 mb-5">
                            <div>
                              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest block font-questrial">
                                Order Product Details
                              </span>
                              <h3 className="text-lg font-bold text-neutral-900 tracking-wide uppercase font-sans mt-0.5">
                                ORDER #{selectedOrderDetails.orderNumber}
                              </h3>
                              <p className="text-xs text-neutral-400 font-light mt-0.5">
                                Placed on {selectedOrderDetails.placedDate}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-xs font-medium px-3 py-1 rounded-full ${
                                  selectedOrderDetails.status === 'Delivered'
                                    ? 'bg-[#E7F8EC] text-[#22C55E]'
                                    : selectedOrderDetails.status === 'Shipped'
                                    ? 'bg-sky-50 text-sky-600'
                                    : selectedOrderDetails.status === 'Cancelled'
                                    ? 'bg-rose-50 text-rose-600'
                                    : 'bg-amber-50 text-amber-600'
                                }`}
                              >
                                {selectedOrderDetails.status}
                              </span>
                              <button
                                onClick={() => setSelectedOrderDetails(null)}
                                className="text-neutral-400 hover:text-neutral-900 text-base font-bold p-1 cursor-pointer"
                                title="Close"
                              >
                                ✕
                              </button>
                            </div>
                          </div>

                          {/* Products in this order */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-sans">
                              Items Ordered ({selectedOrderDetails.items.length})
                            </h4>

                            <div className="divide-y divide-neutral-100 border border-neutral-150 rounded-none">
                              {selectedOrderDetails.items.map((item, idx) => (
                                <div key={idx} className="p-3.5 flex items-center gap-4 bg-white">
                                  <div className="w-16 h-16 bg-neutral-100 rounded-none overflow-hidden relative flex-shrink-0 border border-neutral-150">
                                    <Image
                                      src={item.image}
                                      alt={item.title}
                                      fill
                                      sizes="64px"
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="text-xs font-semibold text-neutral-900 leading-snug">
                                      {item.title}
                                    </h5>
                                    <p className="text-xs text-neutral-400 font-light mt-0.5 font-questrial">
                                      Quantity: {item.quantity}
                                    </p>
                                    <p className="text-xs font-bold text-neutral-900 mt-1">
                                      ₹{item.price.toLocaleString('en-IN')}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Total & Action Buttons */}
                          <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest block font-questrial">
                                Total Amount
                              </span>
                              <span className="text-lg font-bold text-neutral-900">
                                ₹{selectedOrderDetails.total.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedOrderDetails(null)}
                                className="border border-neutral-300 text-neutral-700 text-xs font-semibold px-4 py-2 uppercase tracking-wider hover:bg-neutral-50 transition-colors cursor-pointer"
                              >
                                Close
                              </button>
                              <Link
                                href="/shop"
                                className="bg-[#310C13] hover:bg-[#4a101a] text-white text-xs font-semibold px-5 py-2 uppercase tracking-wider transition-colors inline-block"
                              >
                                Shop More
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Empty state matching Image 4 */
                  <div className="py-12 text-left">
                    <h3
                      className="text-neutral-900 mb-2"
                      style={{ ...headlineStyle, fontSize: '28px' }}
                    >
                      No Orders Yet
                    </h3>
                    <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-md mb-6">
                      You haven&apos;t placed any orders yet.
                      <br />
                      Explore our collections and find something you&apos;d love to have!
                    </p>
                    <Link
                      href="/shop"
                      className="bg-[#310C13] hover:bg-[#4a101a] text-white text-xs font-semibold px-6 py-3 tracking-widest uppercase transition-colors inline-block"
                    >
                      START SHOPPING
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: MY WISHLIST */}
            {activeTab === 'wishlist' && (
              <div>
                <h1
                  className="text-neutral-900 tracking-normal pb-6"
                  style={headlineStyle}
                >
                  My Wishlist
                </h1>
                <div className="py-12 text-left">
                  <h3
                    className="text-neutral-900 mb-2"
                    style={{ ...headlineStyle, fontSize: '28px' }}
                  >
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-md mb-6">
                    Save your favorite bridal jewelry, necklaces, and clutches to purchase them later.
                  </p>
                  <Link
                    href="/shop"
                    className="bg-[#310C13] hover:bg-[#4a101a] text-white text-xs font-semibold px-6 py-3 tracking-widest uppercase transition-colors inline-block"
                  >
                    START SHOPPING
                  </Link>
                </div>
              </div>
            )}

            {/* TAB 4: SAVED ADDRESSES (Real addresses loaded from PostgreSQL database) */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between pb-6">
                  <h1
                    className="text-neutral-900 tracking-normal"
                    style={headlineStyle}
                  >
                    Saved Addresses
                  </h1>
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(true)}
                    className="bg-[#310C13] hover:bg-[#4a101a] text-white text-xs font-semibold px-4 py-2 uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD ADDRESS</span>
                  </button>
                </div>

                {loadingAddresses ? (
                  <div className="py-12 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#C59B27]" />
                    <span>Loading your saved addresses...</span>
                  </div>
                ) : addresses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr, idx) => (
                      <div
                        key={addr.id}
                        className="border border-neutral-200 p-5 rounded-none relative bg-white flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-semibold text-[#C59B27] border border-[#C59B27] px-2 py-0.5 uppercase tracking-wider inline-block">
                              {idx === 0 ? 'DEFAULT ADDRESS' : `${addr.type || 'ADDRESS'}`}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Delete address"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h4 className="text-sm font-semibold text-neutral-900">
                            {displayName}
                          </h4>
                          <p className="text-xs text-neutral-600 font-light mt-1.5 leading-relaxed">
                            {addr.street1}
                            {addr.street2 ? `, ${addr.street2}` : ''}
                            <br />
                            {addr.city}, {addr.state} - {addr.zipCode}
                          </p>
                          {addr.phone && (
                            <p className="text-xs text-neutral-500 font-light mt-2">
                              Mobile: {addr.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-left">
                    <h3
                      className="text-neutral-900 mb-2"
                      style={{ ...headlineStyle, fontSize: '28px' }}
                    >
                      No Saved Addresses
                    </h3>
                    <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-md mb-6">
                      You haven&apos;t added any addresses yet. Add your delivery address for faster checkout.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(true)}
                      className="bg-[#310C13] hover:bg-[#4a101a] text-white text-xs font-semibold px-6 py-3 tracking-widest uppercase transition-colors inline-block cursor-pointer"
                    >
                      ADD NEW ADDRESS
                    </button>
                  </div>
                )}

                {/* Add Address Modal */}
                {showAddressModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
                    <div className="bg-white max-w-md w-full p-6 shadow-2xl">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                        Add New Address
                      </h3>
                      <form onSubmit={handleCreateAddress} className="space-y-3 text-xs">
                        <input
                          type="text"
                          required
                          placeholder="Street Address, Flat / House No. *"
                          value={newAddress.street1}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, street1: e.target.value })
                          }
                          className="w-full border border-neutral-300 p-2.5 rounded focus:outline-none focus:border-[#310C13]"
                        />
                        <input
                          type="text"
                          placeholder="Landmark, Area (Optional)"
                          value={newAddress.street2}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, street2: e.target.value })
                          }
                          className="w-full border border-neutral-300 p-2.5 rounded focus:outline-none focus:border-[#310C13]"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="City *"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, city: e.target.value })
                            }
                            className="w-full border border-neutral-300 p-2.5 rounded focus:outline-none focus:border-[#310C13]"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={newAddress.state}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, state: e.target.value })
                            }
                            className="w-full border border-neutral-300 p-2.5 rounded focus:outline-none focus:border-[#310C13]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="PIN Code *"
                            value={newAddress.zipCode}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, zipCode: e.target.value })
                            }
                            className="w-full border border-neutral-300 p-2.5 rounded focus:outline-none focus:border-[#310C13]"
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={newAddress.phone}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, phone: e.target.value })
                            }
                            className="w-full border border-neutral-300 p-2.5 rounded focus:outline-none focus:border-[#310C13]"
                          />
                        </div>
                        <div className="flex justify-end gap-3 mt-5 pt-3 border-t border-neutral-100">
                          <button
                            type="button"
                            onClick={() => setShowAddressModal(false)}
                            className="px-4 py-2 text-xs border border-neutral-300 hover:bg-neutral-50 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isAddingAddress}
                            className="px-5 py-2 text-xs bg-[#310C13] text-white hover:bg-[#4a101a] cursor-pointer flex items-center gap-1.5"
                          >
                            {isAddingAddress && <Loader2 className="w-3 h-3 animate-spin" />}
                            <span>Save Address</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: PAYMENT METHODS */}
            {activeTab === 'payment' && (
              <div>
                <h1
                  className="text-neutral-900 tracking-normal pb-6"
                  style={headlineStyle}
                >
                  Payment Methods
                </h1>
                <div className="space-y-4 max-w-lg">
                  <div className="border border-neutral-200 p-4 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      <FigmaPaymentIcon className="w-5 h-5" stroke="#C59B27" />
                      <div>
                        <p className="text-xs font-semibold text-neutral-900">
                          Secure Online Payments
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          PhonePe Payment Gateway (UPI, Credit/Debit Cards, NetBanking)
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="p-4 bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
                    <p className="font-semibold text-neutral-800 mb-1">
                      Bank-Grade Security
                    </p>
                    <p className="text-neutral-500 font-light text-[11px]">
                      All transactions are 256-bit encrypted through RBI-compliant payment gateways. Card details are never stored on Brides Berry servers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: ACCOUNT SETTINGS */}
            {activeTab === 'settings' && (
              <div>
                <h1
                  className="text-neutral-900 tracking-normal pb-6"
                  style={headlineStyle}
                >
                  Account Settings
                </h1>
                <div className="space-y-6 max-w-md text-xs">
                  <div className="border-b border-neutral-100 pb-4">
                    <h4 className="font-semibold text-neutral-800 mb-1">
                      Email Preferences
                    </h4>
                    <p className="text-neutral-400 font-light mb-3">
                      Receive order updates, shipping notifications, and curated bridal collections.
                    </p>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="accent-[#310C13]"
                      />
                      <span className="text-neutral-700">Email notifications enabled</span>
                    </label>
                  </div>

                  <div className="border-b border-neutral-100 pb-4">
                    <h4 className="font-semibold text-neutral-800 mb-1">
                      Security &amp; Password
                    </h4>
                    <p className="text-neutral-400 font-light mb-3">
                      Ensure your account remains safe with strong email OTP authentication.
                    </p>

                    {!showPasswordChange ? (
                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordChange(true);
                          setPasswordError(null);
                          if (!otpSent) {
                            handleSendOtp();
                          }
                        }}
                        className="border border-neutral-300 hover:bg-neutral-50 px-4 py-2 uppercase text-[11px] font-semibold tracking-wider cursor-pointer"
                      >
                        Change Password
                      </button>
                    ) : (
                      <div className="bg-[#FAF8F5] border border-[#E8DBB4] p-5 rounded-[2px] mt-3">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider">
                            Change Password via Email OTP
                          </h5>
                          <button
                            type="button"
                            onClick={() => {
                              setShowPasswordChange(false);
                              setPasswordError(null);
                            }}
                            className="text-neutral-400 hover:text-neutral-700 text-xs cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>

                        <p className="text-neutral-600 text-[11px] mb-4">
                          A 6-digit verification code will be sent to{' '}
                          <span className="font-semibold text-neutral-900">
                            {displayEmail}
                          </span>
                          .
                        </p>

                        {passwordError && (
                          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-[11px] mb-4">
                            {passwordError}
                          </div>
                        )}

                        <form onSubmit={handleUpdatePassword} className="space-y-3.5">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                                6-Digit OTP Code *
                              </label>
                              <button
                                type="button"
                                disabled={isSendingOtp || cooldown > 0}
                                onClick={handleSendOtp}
                                className="text-[10px] text-[#C59B27] font-semibold hover:underline disabled:opacity-50 cursor-pointer"
                              >
                                {isSendingOtp
                                  ? 'Sending...'
                                  : cooldown > 0
                                  ? `Resend in ${cooldown}s`
                                  : 'Resend Code'}
                              </button>
                            </div>
                            <input
                              type="text"
                              maxLength={6}
                              value={passwordOtp}
                              onChange={(e) => setPasswordOtp(e.target.value.replace(/\D/g, ''))}
                              placeholder="e.g. 123456"
                              className="w-full border border-neutral-300 px-3 py-2 text-xs tracking-widest text-neutral-900 focus:outline-none focus:border-[#310C13] bg-white"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                              New Password (min 8 chars) *
                            </label>
                            <input
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="••••••••"
                              minLength={8}
                              className="w-full border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#310C13] bg-white"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                              Confirm New Password *
                            </label>
                            <input
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="••••••••"
                              minLength={8}
                              className="w-full border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#310C13] bg-white"
                              required
                            />
                          </div>

                          <div className="pt-2 flex items-center gap-3">
                            <button
                              type="submit"
                              disabled={isResettingPassword}
                              className="bg-[#310C13] hover:bg-[#4a141e] text-white px-5 py-2.5 uppercase text-[10px] font-semibold tracking-wider cursor-pointer disabled:opacity-60 flex items-center gap-2"
                            >
                              {isResettingPassword && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                              <span>Save New Password</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowPasswordChange(false);
                                setPasswordError(null);
                              }}
                              className="border border-neutral-300 hover:bg-neutral-100 text-neutral-700 px-4 py-2.5 uppercase text-[10px] font-semibold tracking-wider cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 text-center text-xs font-semibold text-neutral-500 font-questrial">
          Loading your account...
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
