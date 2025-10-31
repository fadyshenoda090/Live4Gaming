"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiLogIn, FiUserPlus, FiSun, FiMoon } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import SideBar from "./SideBar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);

  // Handle theme toggle
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`w-full sticky top-0 z-50 px-6 py-3 flex justify-between items-center border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300
        ${scrolled
        ? "backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 shadow-sm"
        : "bg-white dark:bg-gray-900"
      }`}>
      {/* Left: Logo + Burger */}
      <div className="flex items-center gap-3">
        {/* Burger icon for mobile */}
        <button
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Logo */}
        <Link href={`/`} className="flex items-center gap-2 text-xl font-semibold">
          {/* Image hidden in mobile (placeholder for future logo) */}
          <div className="hidden sm:block w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <span>Live4Gaming</span>
        </Link>
      </div>

      {/* Center: Nav links (hidden on mobile) */}
      <div className="hidden md:flex gap-6 font-medium">
        <Link href="#" className="hover:text-blue-500">Home</Link>
        <Link href="#" className="hover:text-blue-500">Games</Link>
        <Link href="#" className="hover:text-blue-500">Tournaments</Link>
        <Link href="#" className="hover:text-blue-500">About</Link>
        <Link href="#" className="hover:text-blue-500">Contact</Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 text-lg">
        <button className="hover:text-blue-500 relative">
          <IoNotificationsOutline size={23} />
          <span className="absolute -top-1.5 left-2.5 flex items-center! justify-center bg-violet-500 text-white text-xs h-5 w-5 rounded-full">5</span>
        </button>
        <button className="hover:text-blue-500">
          <FiLogIn size={22} />
        </button>
        <button className="hover:text-blue-500">
          <FiUserPlus size={22} />
        </button>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          {/* Icon changes based on theme */}
          {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}

          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            className="sr-only peer"
          />

          <div
            className="relative w-[35px] h-5 bg-gray-200 rounded-full 
            peer-focus:outline-none dark:bg-gray-700 peer-checked:bg-violet-500
            after:content-[''] after:absolute after:top-0.5 after:start-0.5
            after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all 
            peer-checked:after:translate-x-[15px]"
          ></div>
        </label>
      </div>

      {/* Sidebar (mobile only) */}
      {menuOpen && <SideBar setMenuOpen={setMenuOpen} />}
    </nav >
  );
};

export default Navbar;
