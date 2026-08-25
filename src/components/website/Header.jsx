'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useSelector } from 'react-redux';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/checkout", label: "Checkout" },
  { href: "/login", label: "Login" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)
  const pathname = usePathname();
  const cartItems = useSelector((state) => state.cart?.items);
 

  return (
    <>
      <header className='w-full bg-[#fafaf9f7] backdrop-blur-sm sticky top-0 z-50 border-b border-solid border-[0.5px] border-[#E8E0D5]'>
        <div className='max-w-container mx-auto px-4 sm:px-6 py-2 flex items-center justify-between'>
          <Link href="/" onClick={closeMobileMenu}>
            <div className="text-[16px] font-medium tracking-[0.12em] uppercase text-[#1E1E1E]">
              Nestro
              <span className='text-[#8B5E3C]'>.</span>
            </div>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1 lg:gap-2">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`block font-medium text-[13px] lg:text-[13px] tracking-[0.06em] rounded-md px-2 lg:px-3 py-1.5 transition ${isActive
                        ? "bg-[#F0EBE3] text-[#8b5e3c]"
                        : "text-[#6B7280] hover:bg-[#F0EBE3] hover:text-[#8b5e3c]"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className='flex items-center gap-2 sm:gap-4'>
            <Link href="/search" className=''>
              <div className='hover:bg-[#F0EBE3] hover:rounded-full p-2 hover:text-[#8b5e3c] transition'>
                <IoSearchOutline className='text-xl sm:text-xl' />
              </div>
            </Link>
            <Link href="/cart">
              <div className="relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-[#444444] text-base duration-150 hover:bg-[#F0EBE3] hover:rounded-full p-2 hover:text-[#8b5e3c] transition">
                <HiOutlineShoppingBag />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8B5E3C] rounded-full text-[8px] text-white flex items-center justify-center">
                {cartItems.length ||0}
                </span>
              </div>
            </Link>
            <Link href="/profile">
              <div className='hover:bg-[#D6BFA7] bg-[#F0EBE3] text-[#8b5e3c] rounded-full p-1.5 sm:p-2 border border-[#8b5e3c]/30 transition'>
                <IoPersonOutline className='text-sm sm:text-base' />
              </div>
            </Link>
            <button
              onClick={toggleMobileMenu}
              className='md:hidden text-[#6B7280] hover:text-[#8b5e3c] focus:outline-none p-1'
              aria-label="Toggle menu">
              {mobileMenuOpen ? <HiX className='text-2xl' /> : <HiMenu className='text-2xl' />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className='md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg'>
            <nav className='max-w-7xl mx-auto px-4 py-4'>
              <ul className='flex flex-col gap-2'>
                <li>
                  <Link href="/" onClick={closeMobileMenu} className='block w-full font-medium text-[15px] text-[#6B7280] hover:bg-[#F0EBE3] hover:text-[#8b5e3c] rounded-md px-3 py-2 transition'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/store" onClick={closeMobileMenu} className='block w-full font-medium text-[15px] text-[#6B7280] hover:bg-[#F0EBE3] hover:text-[#8b5e3c] rounded-md px-3 py-2 transition'>
                    Store
                  </Link>
                </li>
                <li>
                  <Link href="/about" onClick={closeMobileMenu} className='block w-full font-medium text-[15px] text-[#6B7280] hover:bg-[#F0EBE3] hover:text-[#8b5e3c] rounded-md px-3 py-2 transition'>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={closeMobileMenu} className='block w-full font-medium text-[15px] text-[#6B7280] hover:bg-[#F0EBE3] hover:text-[#8b5e3c] rounded-md px-3 py-2 transition'>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/checkout" onClick={closeMobileMenu} className='block w-full font-medium text-[15px] text-[#6B7280] hover:bg-[#F0EBE3] hover:text-[#8b5e3c] rounded-md px-3 py-2 transition'>
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link href="/signin" onClick={closeMobileMenu} className='block w-full font-medium text-[15px] text-[#6B7280] hover:bg-[#F0EBE3] hover:text-[#8b5e3c] rounded-md px-3 py-2 transition'>
                    Sign in
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}