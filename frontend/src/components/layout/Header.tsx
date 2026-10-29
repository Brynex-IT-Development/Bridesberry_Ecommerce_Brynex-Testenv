'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems as initialMenuItems } from '../../data/menu';
import { useCart } from '../../context/CartContext';
import MegaMenu from './MegaMenu';
import { MenuItem } from '../../types/menu';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Is this the home page?
  const isHomePage = pathname === '/';

  const [isScrolled, setIsScrolled] = useState(!isHomePage);
  const [prevIsHomePage, setPrevIsHomePage] = useState(isHomePage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  useEffect(() => {
    async function fetchDynamicMenu() {
      try {
        const rawBase =
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          process.env.API_BASE_URL ||
          '';
        const baseUrl = rawBase.endsWith('/api')
          ? rawBase
          : `${rawBase.replace(/\/$/, '')}/api`;
        const res = await fetch(`${baseUrl}/products?limit=50`);
        if (!res.ok) return;
        const data = await res.json();
        const products = data.products || [];

        // Group active products by category
        const productsByCategory: Record<string, any[]> = {};
        
        products.forEach((p: any) => {
          if (p.status !== 'ACTIVE') return;
          
          const catName = p.category?.name || 'Other';
          if (!productsByCategory[catName]) {
            productsByCategory[catName] = [];
          }
          productsByCategory[catName].push(p);
        });

        // Build Mega Menu columns
        const columns = Object.keys(productsByCategory).map(catName => {
          const catProducts = productsByCategory[catName].slice(0, 5);
          return {
            title: catName.toUpperCase(),
            items: catProducts.map((p: any) => ({
              name: p.name.toUpperCase(),
              href: `/shop/product/${p.slug || p.id}`
            }))
          };
        });

        if (columns.length > 0) {
          setMenuItems(prev => prev.map(item => {
            if (item.name === 'Collections') {
              return { ...item, megaMenuColumns: columns };
            }
            return item;
          }));
        }
      } catch (err) {
        console.error('Failed to load dynamic mega menu', err);
      }
    }
    fetchDynamicMenu();
  }, []);

  if (isHomePage !== prevIsHomePage) {
    setPrevIsHomePage(isHomePage);
    setIsScrolled(!isHomePage);
  }

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once on mount to handle initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  // Determine header classes based on route and scroll state
  const headerBgClass = 'bg-white border-b border-neutral-100';

  const navLinkClass = (itemHref: string, itemName: string) => {
    const isCurrent = itemName === 'Collections' || itemName === 'Women' ? false : pathname === itemHref;
    return isCurrent
      ? 'text-[#000000] border-b border-gold-550'
      : 'text-[#000000] hover:text-gold-600';
  };

  const iconButtonClass = 'text-[#000000] hover:text-gold-600';

  const borderClass = 'border-neutral-200/80';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBgClass}`}>
        <div className="w-full px-[6.5%]">
          <div className="flex items-stretch justify-between h-16 md:h-20">

            {/* Left side Brand Area */}
            <div className="flex items-center h-full">
              <Link href="/" className="flex flex-col items-center justify-center">
                <span
                  style={{
                    fontFamily: "'Abhaya Libre', Georgia, serif",
                    fontWeight: 600,
                    fontStyle: 'normal',
                    letterSpacing: '-0.04em',
                    color: '#310C13',
                  }}
                  className="text-[28px] leading-[25px] sm:text-[34px] sm:leading-[30px] md:text-[38.76px] md:leading-[33px] transition-colors duration-300"
                >
                  Brides Berry
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-questrial), 'Questrial', sans-serif",
                    fontWeight: 400,
                    fontStyle: 'normal',
                    letterSpacing: '0.36em',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    color: '#310C13',
                  }}
                  className="text-[5.5px] leading-[8px] sm:text-[6.2px] sm:leading-[9px] md:text-[6.98px] md:leading-[10.08px] mt-1 w-full block"
                >
                  Bridal Jewelry &amp; Accessories
                </span>
              </Link>
            </div>

            {/* Desktop Navigation links */}
            <nav className="hidden md:flex space-x-8 lg:space-x-10 items-center justify-end h-full flex-grow mr-8 lg:mr-12">
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  className="h-full flex items-center relative"
                  onMouseEnter={() => item.hasMegaMenu && setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: "var(--font-stack-text), 'Stack Sans Text', sans-serif",
                      fontWeight: 200,
                      fontStyle: 'normal',
                      fontSize: '14px',
                      lineHeight: '25.11px',
                      letterSpacing: '0%',
                      textTransform: 'uppercase',
                      color: '#000000',
                    }}
                    className={`transition-colors py-2 flex items-center gap-2 ${navLinkClass(
                      item.href,
                      item.name
                    )}`}
                  >
                    <span>{item.name}</span>
                    {(item.name === 'Collections' || item.name === 'Women') && (
                      <svg className="w-3.5 h-3.5 text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Mega Menu Overlay */}
                  {hoveredItem === item && item.hasMegaMenu && (
                    <MegaMenu item={item} onClose={() => setHoveredItem(null)} />
                  )}
                </div>
              ))}
            </nav>

            {/* Right side Grid Area (Icons: Search, Cart, Profile) */}
            <div className="flex items-center h-full">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`flex w-11 sm:w-14 md:w-16 h-9 items-center justify-center md:border-l ${borderClass} text-[#310C13] hover:opacity-75 transition-opacity focus:outline-none cursor-pointer`}
                aria-label="Search products"
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="7.5" stroke="#310C13" strokeWidth="1.5" />
                  <path d="M16.5 16.5L21 21" stroke="#310C13" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Shopping Cart Bag */}
              <Link
                href="/cart"
                className={`w-11 sm:w-14 md:w-16 h-9 flex items-center justify-center relative border-l ${borderClass} text-[#310C13] hover:opacity-75 transition-opacity`}
                aria-label="Cart"
              >
                <div className="relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.34 8H17.66C18.67 8 19.51 8.75 19.64 9.75L20.77 18.25C20.92 19.44 19.99 20.5 18.79 20.5H5.21C4.01 20.5 3.08 19.44 3.23 18.25L4.36 9.75C4.49 8.75 5.33 8 6.34 8Z"
                      stroke="#310C13"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 10.5V7C8.5 5.067 10.067 3.5 12 3.5C13.933 3.5 15.5 5.067 15.5 7V10.5"
                      stroke="#310C13"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -bottom-1.5 -right-2 bg-[#FFD000] text-white text-[10px] font-medium w-[18px] h-[18px] flex items-center justify-center rounded-full leading-none">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* Profile User Icon & Dropdown */}
              <div className="relative flex items-center">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className={`hidden md:flex w-16 h-9 items-center justify-center border-l ${borderClass} text-[#310C13] hover:opacity-75 transition-opacity focus:outline-none cursor-pointer`}
                      aria-label="Account menu"
                    >
                      <span className="font-questrial text-xs font-semibold tracking-wider text-[#310C13] uppercase">
                        {user?.firstName ? user.firstName.substring(0, 2) : 'US'}
                      </span>
                    </button>
                    {profileDropdownOpen && (
                      <div className="absolute right-0 top-[140%] w-48 bg-white border border-neutral-100 shadow-xl py-2 z-50 text-neutral-800">
                        <div className="px-4 py-2 border-b border-neutral-100">
                          <p className="font-questrial text-[10px] text-neutral-400 uppercase tracking-widest">Signed in as</p>
                          <p className="font-raleway text-xs font-semibold text-neutral-800 truncate mt-0.5">{user?.firstName} {user?.lastName}</p>
                        </div>
                        {isAdmin && (
                          <Link
                            href="/admin/dashboard"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="block px-4 py-2 text-xs font-questrial hover:bg-neutral-50 text-neutral-700 hover:text-[#c59b27] uppercase tracking-wider"
                          >
                            Admin Panel
                          </Link>
                        )}
                        <Link
                          href="/orders"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="block px-4 py-2 text-xs font-questrial hover:bg-neutral-50 text-neutral-700 hover:text-[#c59b27] uppercase tracking-wider"
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-questrial hover:bg-neutral-50 text-neutral-700 hover:text-red-600 uppercase tracking-wider border-t border-neutral-50 cursor-pointer"
                        >
                          Log out
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    className={`hidden md:flex w-16 h-9 items-center justify-center border-l ${borderClass} text-[#310C13] hover:opacity-75 transition-opacity`}
                    aria-label="Profile"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="8" r="4" stroke="#310C13" strokeWidth="1.5" />
                      <path
                        d="M5 18.5C5 15.7386 7.46243 14 10.5 14H13.5C16.5376 14 19 15.7386 19 18.5C19 19.6046 18.1046 20.5 17 20.5H7C5.89543 20.5 5 19.6046 5 18.5Z"
                        stroke="#310C13"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )}
              </div>

              {/* Mobile Hamburger menu */}
              <div className="w-14 flex md:hidden items-center justify-center">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className={`p-2 rounded-md ${iconButtonClass} focus:outline-none`}
                  aria-label="Open mobile menu"
                >
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h10" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Slide-out Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true">
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative flex flex-col w-full max-w-xs py-5 pb-12 overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between px-5 pb-4 border-b border-neutral-100">
              <div className="flex flex-col items-start">
                <span
                  style={{
                    fontFamily: "'Abhaya Libre', Georgia, serif",
                    fontWeight: 600,
                    letterSpacing: '-0.04em',
                    color: '#310C13',
                  }}
                  className="text-[26px] leading-[22px]"
                >
                  Brides Berry
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-questrial), 'Questrial', sans-serif",
                    fontWeight: 400,
                    fontSize: '5.5px',
                    lineHeight: '8px',
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: '#310C13',
                  }}
                  className="mt-1 block"
                >
                  Bridal Jewelry &amp; Accessories
                </span>
              </div>
              <button
                type="button"
                className="p-2 text-[#310C13] hover:opacity-70"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-2 py-4 space-y-1">
              {menuItems.map((item, idx) => (
                <div key={idx}>
                  {item.hasMegaMenu ? (
                    <div>
                      <button
                        onClick={() =>
                          setMobileExpandedItem(
                            mobileExpandedItem === item.name ? null : item.name
                          )
                        }
                        className="flex items-center justify-between w-full px-3 py-3 text-sm font-light text-neutral-800 uppercase tracking-widest hover:bg-neutral-50 rounded-md"
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${mobileExpandedItem === item.name ? 'rotate-180' : ''
                            }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Expanded child category lists */}
                      {mobileExpandedItem === item.name && item.megaMenuColumns && (
                        <div className="pl-6 pr-2 py-2 space-y-4 bg-neutral-50 border-y border-neutral-100">
                          {item.megaMenuColumns.map((col, cIdx) => (
                            <div key={cIdx} className="space-y-1.5">
                              <h4 className="text-[10px] uppercase font-semibold text-neutral-600 tracking-wider">
                                {col.title}
                              </h4>
                              <ul className="space-y-1">
                                {col.items.map((sub, sIdx) => (
                                  <li key={sIdx}>
                                    <Link
                                      href={sub.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="block py-1 text-xs text-neutral-500 font-light hover:text-gold-500"
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-3 text-sm font-light text-neutral-800 uppercase tracking-widest hover:bg-neutral-50 rounded-md"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Drawer Auth Section */}
            <div className="px-4 py-6 border-t border-neutral-100 space-y-4">
                {isAuthenticated ? (
                  <>
                    <div className="text-xs font-questrial text-neutral-500 mb-2">
                      Logged in as: <strong className="text-neutral-800 font-medium">{user?.firstName} {user?.lastName}</strong>
                    </div>
                    {isAdmin && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm font-light text-neutral-800 uppercase tracking-widest hover:text-[#c59b27]"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="block w-full text-left py-1 text-sm font-light text-red-600 uppercase tracking-widest hover:underline cursor-pointer"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs font-questrial uppercase tracking-widest text-[#310C13] hover:bg-neutral-50 border border-[#310C13] px-4 py-2.5 flex-1 text-center font-medium"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs font-questrial uppercase tracking-widest text-white hover:bg-[#4a101a] bg-[#310C13] px-4 py-2.5 flex-1 text-center font-medium"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      {/* Expandable Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-start justify-center transition-all duration-300">
          <div className="bg-white w-full max-w-3xl py-6 px-6 shadow-2xl relative mt-20 border border-neutral-100 animate-slide-down">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-light mb-4">
              What are you looking for?
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchOpen(false);
                window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
              }}
              className="flex gap-4 border-b border-neutral-200 pb-2"
            >
              <input
                type="text"
                placeholder="Search earrings, necklaces, rings, gold..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-base font-light text-neutral-800 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="text-neutral-500 hover:text-gold-600 font-light text-sm uppercase tracking-widest"
              >
                Search
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2.5 items-center text-xs font-light text-neutral-500">
              <span className="font-normal text-neutral-700">Popular Searches:</span>
              <Link href="/shop?category=rings" onClick={() => setSearchOpen(false)} className="hover:text-gold-500 underline decoration-neutral-200">Rings</Link>
              <span>•</span>
              <Link href="/shop?category=earrings" onClick={() => setSearchOpen(false)} className="hover:text-gold-500 underline decoration-neutral-200">Earrings</Link>
              <span>•</span>
              <Link href="/shop?collection=aurelia" onClick={() => setSearchOpen(false)} className="hover:text-gold-500 underline decoration-neutral-200">Aurelia</Link>
              <span>•</span>
              <Link href="/shop?filter=bestseller" onClick={() => setSearchOpen(false)} className="hover:text-gold-500 underline decoration-neutral-200">Best Sellers</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
