"use client";

import React, { useState, useEffect } from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import AdminStatCard from "@/components/admin/shared/AdminStatCard";
import {
  getCustomers,
  getActiveSessions,
  revokeSession,
  revokeAllUserSessions,
} from "@/services/orders.service";
import { AdminCustomer, AdminUserSession } from "@/types/admin";

export default function AdminCustomersPage() {
  const [activeTab, setActiveTab] = useState<"customers" | "sessions">("customers");
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [sessions, setSessions] = useState<AdminUserSession[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const breadcrumbs = [{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Customers" }];

  const loadData = async () => {
    setLoading(true);
    try {
      const [custList, sessList] = await Promise.all([
        getCustomers(),
        getActiveSessions(),
      ]);
      setCustomers(custList);
      setSessions(sessList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Auto-refresh every 30s to keep online status fresh
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRevokeSession = async (sessionId: string) => {
    if (!confirm("Are you sure you want to log out this session?")) return;
    setRevokingId(sessionId);
    try {
      const ok = await revokeSession(sessionId);
      if (ok) {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      }
    } finally {
      setRevokingId(null);
    }
  };

  const handleRevokeAllUser = async (userId: string) => {
    if (!confirm("Are you sure you want to log out all devices for this user?")) return;
    setRevokingId(userId);
    try {
      const ok = await revokeAllUserSessions(userId);
      if (ok) {
        setSessions((prev) => prev.filter((s) => s.userId !== userId));
      }
    } finally {
      setRevokingId(null);
    }
  };

  // Filter customers by name or email
  const filteredCustomers = customers.filter((customer) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const name = `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.toLowerCase();
      return name.includes(q) || customer.email.toLowerCase().includes(q);
    }
    return true;
  });

  // Filter sessions by name, email, ip, or user agent
  const filteredSessions = sessions.filter((session) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const name = (session.user?.name ?? "").toLowerCase();
      const email = (session.user?.email ?? "").toLowerCase();
      const ip = (session.ipAddress ?? "").toLowerCase();
      return name.includes(q) || email.includes(q) || ip.includes(q);
    }
    return true;
  });

  // Compute stats from real data
  const totalSpend = customers.reduce((s, c) => s + (typeof c.totalSpend === "number" ? c.totalSpend : 0), 0);
  const onlineNowCount = sessions.filter((s) => s.isOnline).length;
  const activeSessionsCount = sessions.length;

  const customerStats = [
    {
      id: "online",
      title: "ONLINE NOW",
      value: onlineNowCount.toString(),
      subNote: "active in last 15 mins",
    },
    {
      id: "sessions",
      title: "ACTIVE SESSIONS",
      value: activeSessionsCount.toString(),
      subNote: "logged-in devices",
    },
    {
      id: "total",
      title: "TOTAL CUSTOMERS",
      value: customers.length.toString(),
      subNote: "registered accounts",
    },
    {
      id: "spend",
      title: "TOTAL REVENUE",
      value: `₹${totalSpend.toLocaleString("en-IN")}`,
      subNote: "from customer orders",
    },
  ];

  const parseDevice = (userAgent?: string | null) => {
    if (!userAgent) return "Unknown Device";
    if (/iphone|ipad|ipod/i.test(userAgent)) return "Apple iOS (Mobile)";
    if (/android/i.test(userAgent)) return "Android (Mobile)";
    if (/macintosh|mac os x/i.test(userAgent)) return "macOS (Desktop)";
    if (/windows/i.test(userAgent)) return "Windows (Desktop)";
    if (/linux/i.test(userAgent)) return "Linux (Desktop)";
    return "Web Browser";
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Top Header Bar with active search */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={true}
        searchPlaceholder="Search by name, email, or IP..."
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto min-w-0">
        {/* Page Title & Tab Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
              CUSTOMERS & ACTIVE USERS
            </h1>
            <p className="text-[11px] text-neutral-450 mt-1 font-medium">
              Monitor customer accounts, real-time online activity, and active sessions
            </p>
          </div>

          {/* Navigation Pill Tabs */}
          <div className="flex items-center space-x-1 bg-neutral-200/60 p-1 rounded-xl self-start sm:self-auto border border-neutral-300/40">
            <button
              type="button"
              onClick={() => setActiveTab("customers")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "customers"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              All Customers ({customers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("sessions")}
              className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "sessions"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Logged-in Sessions ({sessions.length})</span>
            </button>
          </div>
        </div>

        {/* Customer Stats Row (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {customerStats.map((stat) => (
            <AdminStatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              subNote={stat.subNote}
            />
          ))}
        </div>

        {/* Content Container (Table) */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden flex flex-col">
          {activeTab === "customers" ? (
            /* TAB 1: ALL REGISTERED CUSTOMERS */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1E1D1B] text-white text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold">CUSTOMER</th>
                    <th className="py-4 px-6 font-semibold">EMAIL</th>
                    <th className="py-4 px-6 font-semibold">ONLINE STATUS</th>
                    <th className="py-4 px-6 font-semibold">ACCOUNT STATUS</th>
                    <th className="py-4 px-6 font-semibold">ORDERS</th>
                    <th className="py-4 px-6 font-semibold">TOTAL SPEND</th>
                    <th className="py-4 px-6 font-semibold">JOINED DATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                        {/* Customer Profile + Name */}
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-200 flex items-center justify-center text-white text-xs font-semibold overflow-hidden">
                              <svg className="w-3.5 h-3.5 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-neutral-800 whitespace-nowrap block">
                                {customer.firstName || customer.lastName
                                  ? `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim()
                                  : "Guest Customer"}
                              </span>
                              {customer.activeSessionsCount && customer.activeSessionsCount > 0 ? (
                                <span className="text-[10px] text-neutral-400 font-medium">
                                  {customer.activeSessionsCount} active {customer.activeSessionsCount === 1 ? "device" : "devices"}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-4 px-6 text-xs text-neutral-600 font-semibold whitespace-nowrap">
                          {customer.email}
                        </td>

                        {/* Online Status */}
                        <td className="py-4 px-6 text-xs whitespace-nowrap">
                          {customer.isOnline ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              ONLINE NOW
                            </span>
                          ) : customer.lastActiveAt ? (
                            <span className="text-[11px] text-neutral-400 font-medium">
                              Active {new Date(customer.lastActiveAt as string).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          ) : (
                            <span className="text-[11px] text-neutral-400 font-medium">Offline</span>
                          )}
                        </td>

                        {/* Account Status */}
                        <td className="py-4 px-6 text-xs text-neutral-500 font-medium whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              customer.status === "ACTIVE"
                                ? "bg-green-50 text-green-700"
                                : "bg-neutral-100 text-neutral-500"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>

                        {/* Order Count */}
                        <td className="py-4 px-6 text-xs font-semibold text-neutral-600">
                          {(customer.orderCount ?? 0) < 10
                            ? `0${customer.orderCount ?? 0}`
                            : customer.orderCount}
                        </td>

                        {/* Total Spend */}
                        <td className="py-4 px-6 text-xs font-bold text-neutral-900">
                          {typeof customer.totalSpend === "number"
                            ? `₹${customer.totalSpend.toLocaleString("en-IN")}`
                            : customer.totalSpend ?? "₹0"}
                        </td>

                        {/* Date Joined */}
                        <td className="py-4 px-6 text-xs text-neutral-400 font-medium whitespace-nowrap">
                          {customer.joinedDate
                            ? new Date(customer.joinedDate as string).toLocaleDateString("en-IN")
                            : "—"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-xs text-neutral-400 font-medium">
                        {loading ? "Loading customers..." : "No customers found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* TAB 2: ACTIVE LOGGED-IN SESSIONS */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1E1D1B] text-white text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold">LOGGED-IN USER</th>
                    <th className="py-4 px-6 font-semibold">STATUS</th>
                    <th className="py-4 px-6 font-semibold">DEVICE / BROWSER</th>
                    <th className="py-4 px-6 font-semibold">IP ADDRESS</th>
                    <th className="py-4 px-6 font-semibold">LAST ACTIVE</th>
                    <th className="py-4 px-6 font-semibold">LOGGED IN AT</th>
                    <th className="py-4 px-6 font-semibold text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredSessions.length > 0 ? (
                    filteredSessions.map((session) => (
                      <tr key={session.id} className="hover:bg-neutral-50/50 transition-colors">
                        {/* User Profile + Name & Role */}
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-200 flex items-center justify-center text-white text-xs font-semibold overflow-hidden">
                              <svg className="w-3.5 h-3.5 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-neutral-800 whitespace-nowrap block">
                                {session.user?.name || "Customer"}
                              </span>
                              <span className="text-[10px] text-neutral-500 font-medium block">
                                {session.user?.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Online Pulse */}
                        <td className="py-4 px-6 text-xs whitespace-nowrap">
                          {session.isOnline ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              ONLINE NOW
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400"></span>
                              IDLE / INACTIVE
                            </span>
                          )}
                        </td>

                        {/* Device / User-Agent */}
                        <td className="py-4 px-6 text-xs whitespace-nowrap">
                          <div className="flex items-center space-x-1.5 text-neutral-800 font-medium">
                            <svg className="w-4 h-4 text-neutral-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>{parseDevice(session.userAgent)}</span>
                          </div>
                        </td>

                        {/* IP Address */}
                        <td className="py-4 px-6 text-xs font-mono text-neutral-600 whitespace-nowrap">
                          {session.ipAddress ? session.ipAddress.replace("::ffff:", "") : "—"}
                        </td>

                        {/* Last Active */}
                        <td className="py-4 px-6 text-xs text-neutral-500 font-medium whitespace-nowrap">
                          {session.lastActiveAt
                            ? new Date(session.lastActiveAt).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              })
                            : "—"}
                        </td>

                        {/* Created At */}
                        <td className="py-4 px-6 text-xs text-neutral-400 font-medium whitespace-nowrap">
                          {session.createdAt
                            ? new Date(session.createdAt).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—"}
                        </td>

                        {/* Action: Terminate Session */}
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleRevokeSession(session.id)}
                              disabled={revokingId === session.id}
                              className="px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-md hover:bg-rose-100 transition-colors disabled:opacity-50"
                            >
                              {revokingId === session.id ? "Logging out..." : "Log Out"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRevokeAllUser(session.userId)}
                              disabled={revokingId === session.userId}
                              title="Log user out of all devices"
                              className="p-1 text-neutral-400 hover:text-neutral-700 rounded transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-xs text-neutral-400 font-medium">
                        {loading ? "Loading active sessions..." : "No active sessions found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
