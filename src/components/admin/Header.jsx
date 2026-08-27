'use client';

import React, { useState } from 'react';
import { FaBell, FaSearch } from 'react-icons/fa';
import Image from 'next/image';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="w-full h-[60.8px] shadow-sm border-b border-white/20 px-6 flex items-center justify-between sticky top-0 z-40 bg-white">
      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back 👋</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        {/* Search - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl w-64">
          <FaSearch className="text-gray-500" aria-hidden="true" />
          <label htmlFor="header-search" className="sr-only">
            Search
          </label>
          <input
            id="header-search"
            type="text"
            placeholder="Search here..."
            className="bg-transparent outline-none text-sm w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Notification Bell */}
        <button
          className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 duration-200"
          aria-label="Notifications"
        >
          <FaBell className="text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true">
            {/*  text-[10px] text-white flex items-center justify-center p-1 */}
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="relative w-12 h-12">
            <Image
              src="/mypic.jpeg"
              alt="Profile picture of Madhav"
              fill
              sizes="48px"
              className="rounded-full border-2 border-gray-200 object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <h3 className="text-sm font-semibold text-gray-800">Madhav</h3>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}