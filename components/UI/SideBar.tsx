"use client";
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const SideBar = ({ setMenuOpen }: { setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [theme, setTheme] = useState("light");
    const [isVisible, setIsVisible] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);

    // Add/remove dark mode class
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    const handleClickOutside = (event: MouseEvent) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
            setIsVisible(false);
            setTimeout(() => setMenuOpen(false), 300); // match transition duration
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        setTimeout(() => setIsVisible(true), 10); // trigger animation after mount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => setMenuOpen(false), 300);
    };

    return (
        <div className={`${isVisible ? 'translate-x-0' : '-translate-x-full'} fixed inset-0 backdrop-blur-sm md:hidden transition-opacity duration-100`}>
            {/* Drawer */}
            <div
                ref={drawerRef}
                className={`absolute top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out
            ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="w-full flex items-center justify-between px-1 border-b border-gray-300 dark:border-gray-700 pb-2">
                    <h2 className="text-xl font-semibold">Menu</h2>
                    <button onClick={handleClose}>
                        <IoIosCloseCircleOutline className="cursor-pointer" size={25} />
                    </button>
                </div>

                <Link href="#" onClick={handleClose}>Home</Link>
                <Link href="#" onClick={handleClose}>Games</Link>
                <Link href="#" onClick={handleClose}>Tournaments</Link>
                <Link href="#" onClick={handleClose}>About</Link>
                <Link href="#" onClick={handleClose}>Contact</Link>
            </div>
        </div>
    );
};

export default SideBar;
