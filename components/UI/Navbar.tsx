"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiLogIn, FiUserPlus } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import SideBar from "./SideBar";
import Image from "next/image";
import { getEnrollments, subscribe } from "@/lib/enrollment";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [enrolledCount, setEnrolledCount] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Initialize asynchronously to avoid direct setState call
        const enrollments = getEnrollments();
        if (enrollments && Array.isArray(enrollments)) {
            // Schedule state update in the next event loop tick
            setTimeout(() => setEnrolledCount(enrollments.length), 0);
        }

        // Subscribe for updates
        const unsub = subscribe(() => {
            const updated = getEnrollments();
            setEnrolledCount(updated.length);
        });

        return () => unsub();
    }, []);

    return (
        <nav
            className={`w-full fixed top-0 z-50 px-6 py-3 flex justify-between items-center border-b border-amber-500/20 text-gray-100 transition-all duration-300 ${
                scrolled
                    ? "backdrop-blur-md bg-gray-900/80 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                    : "bg-gray-900"
            }`}
        >
            {/* Left: Logo + Burger */}
            <div className="flex items-center gap-3">
                {/* Mobile menu button */}
                <button
                    className="md:hidden text-2xl cursor-pointer text-amber-400 hover:text-amber-300 transition-colors duration-300"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-semibold text-amber-400 hover:text-amber-300 transition-all duration-300"
                >
                    <Image
                        src="/logo.png"
                        alt="LiveForGaming"
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full border border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                    />
                    <span className="hidden sm:block font-bold tracking-wide">
            Live4Gaming
          </span>
                </Link>
            </div>

            {/* Center Links (Desktop) */}
            <div className="hidden md:flex gap-6 font-medium">
                {[
                    { href: "/", label: "Home" },
                    { href: "/games", label: "Games" },
                    { href: "/tournaments", label: "Tournaments" },
                    { href: "/about", label: "About" },
                    { href: "/contact-us", label: "Contact" },
                ].map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="hover:text-amber-400 transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-4 text-lg">
                <Link
                    href="/tournaments/enrolled"
                    className="hidden sm:inline-flex items-center gap-1 hover:text-amber-400 transition-all duration-300"
                >
                    <span className="text-sm">Enrolled</span>
                    {enrolledCount > 0 && (
                        <span className="flex items-center justify-center bg-amber-500 text-black text-xs h-5 min-w-5 px-1 rounded-full font-bold shadow-[0_0_6px_rgba(245,158,11,0.6)]">
              {enrolledCount}
            </span>
                    )}
                </Link>

                {/* Notifications */}
                <button className="relative hover:text-amber-400 transition-all duration-300">
                    <IoNotificationsOutline size={23} />
                    <span className="absolute -top-1.5 -right-2 flex items-center justify-center bg-orange-500 text-black text-xs h-5 w-5 rounded-full font-bold shadow-[0_0_8px_rgba(249,115,22,0.6)]">
            5
          </span>
                </button>

                {/* Auth Icons */}
                <button className="hover:text-amber-400 transition-all duration-300">
                    <FiLogIn size={22} />
                </button>
                <button className="hover:text-amber-400 transition-all duration-300">
                    <FiUserPlus size={22} />
                </button>
            </div>

            {/* Sidebar (mobile) */}
            {menuOpen && <SideBar setMenuOpen={setMenuOpen} />}
        </nav>
    );
};

export default Navbar;
