"use client"
import { useState } from 'react';
import Link from 'next/link';
export default function UserMenu() {

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="">
      <button
        className="font-extralight text-black font-bold text-2xl focus:outline-none"
        onClick={handleToggle}
      >
        Profile
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link
              href="/dashboard"
              onClick={() => { handleClose() }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Profile
            </Link>
            <button
              onClick={handleClose}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              My account
            </button>
            <Link
              href="'/logout'"
              onClick={() => { handleClose(); }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
