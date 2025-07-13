/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { headerConfig } from "@/utils/header-config";
import { FiSearch, FiMenu } from "react-icons/fi"; // Add this import
import toast from "react-hot-toast";
import { HEADER } from "@/utils/constants";

const renderNavItem = (
  item: (typeof headerConfig)[0],
  selectedItem: string,
  isMobile = false
) => {
  const baseClasses = isMobile
    ? "py-2 hover:text-[#fdb557] transition-colors text-left cursor-pointer"
    : "hover:text-[#fdb557] transition-colors cursor-pointer";

  const selectedClasses = item.id === selectedItem ? "text-[#fdb557]" : "";

  return (
    <button
      key={item.id}
      onClick={item.onClick}
      className={`${baseClasses} ${selectedClasses}`}
    >
      {item.name}
    </button>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedItem, setSelectedItem] = useState(HEADER.ALL_DATA);

  const handleUnavailableFeature = () => {
    toast("Feature not available");
  };

  return (
    <header className="bg-[#1f5f8d] text-white px-4 py-4 md:pl-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="" className="w-10 h-10" />
          <span className="text-xl font-semibold">CivicDataSpace</span>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleUnavailableFeature}
            className="hidden md:flex p-2 cursor-pointer"
          >
            <FiSearch className="w-5 h-5" />
          </button>
          <nav className="hidden md:flex items-center space-x-4">
            {headerConfig.map((item) => renderNavItem(item, selectedItem))}
          </nav>
          <button
            onClick={handleUnavailableFeature}
            className="hidden md:flex bg-[#84dccf] text-black px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
          >
            LOGIN / SIGN UP
          </button>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden py-4">
          <div className="flex flex-col space-y-2">
            {headerConfig.map((item) =>
              renderNavItem(item, selectedItem, true)
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
