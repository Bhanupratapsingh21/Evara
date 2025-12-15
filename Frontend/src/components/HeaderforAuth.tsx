'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // helper to check active link
    const isActive = (href: string) => pathname === href;

    return (
        <>
            <header className="w-full fixed px-4 md:px-20 py-4 flex items-center justify-between bg-opacity-30 backdrop-blur-[2px] z-50">
                {/* Logo */}
                <div className="text-2xl font-bold text-[#B30738]">
                    <Link href="/">AssumeChat</Link>
                </div>

            </header>
        </>
    );
}
