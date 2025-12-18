'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogOut, FiUser, FiZap } from 'react-icons/fi';
import { GraduationCap } from 'lucide-react';

import { UserState } from '@/types/userstate';
import { logoutUser } from '@/lib/logout';
import { logout } from '@/store/slices/userSlice';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector((state: { user: UserState }) => state.user.user);
    const isAuthenticated = useSelector((state: { user: UserState }) => state.user.isAuthenticated);

    const isActive = (href: string) => pathname === href;

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logout());
        router.push('/');
        setIsMenuOpen(false);
    };

    // Nav Links Configuration
    const authLinks = [
        { label: 'Waiting Room', href: '/waitingRoom' },
        { label: 'Explore', href: '/ComingSoon' },
    ];

    const guestLinks = [
        { label: 'How it works?', href: '#how-it-works' },
        { label: 'Features', href: '#features' },
        { label: 'About Us', href: '#about' },
    ];

    const currentLinks = isAuthenticated ? authLinks : guestLinks;

    return (
        <>
            <motion.header 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full fixed top-0 left-0 px-6 md:px-16 py-4 flex items-center justify-between border-b border-slate-100 bg-white/70 backdrop-blur-md z-[100]"
            >
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] flex items-center justify-center text-white shadow-sm group-hover:rotate-6 transition-transform">
                        <GraduationCap size={18} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[#0F172A]">EVARA</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    {currentLinks.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`relative text-sm font-semibold transition-colors duration-300 ${
                                isActive(href) ? 'text-[#5FA8FF]' : 'text-[#64748B] hover:text-[#0F172A]'
                            }`}
                        >
                            {label}
                            {isActive(href) && (
                                <motion.div 
                                    layoutId="nav-underline"
                                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#5FA8FF] rounded-full" 
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            {/* User Profile Info */}
                            <div className="flex items-center gap-3 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-2xl">
                                <div className="w-6 h-6 rounded-full bg-[#B9A8FF]/20 flex items-center justify-center text-[#B9A8FF]">
                                    <FiUser size={14} />
                                </div>
                                <span className="text-sm font-bold text-[#0F172A]">Hi, {user?.name.split(' ')[0]}</span>
                            </div>
                            
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-[#F87171] hover:bg-red-50 rounded-xl transition-colors"
                            >
                                <FiLogOut size={16} />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/signin"
                                className="px-6 py-2.5 text-sm font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signup"
                                className="px-6 py-2.5 text-sm font-bold text-white bg-[#0F172A] hover:bg-[#1e293b] rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-2"
                            >
                                <FiZap size={14} className="text-[#B9A8FF]" />
                                Join EVARA
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-[#0F172A]"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                </button>
            </motion.header>

            {/* Mobile Sidebar Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
                        />
                        
                        {/* Menu Content */}
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-[280px] bg-white z-[110] shadow-2xl md:hidden flex flex-col p-8"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-xl font-bold text-[#0F172A]">Menu</span>
                                <button onClick={() => setIsMenuOpen(false)}><FiX size={24}/></button>
                            </div>

                            {isAuthenticated && (
                                <div className="mb-10 p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#5FA8FF] text-white flex items-center justify-center font-bold">
                                        {user?.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Student Profile</p>
                                        <p className="text-sm font-bold text-[#0F172A]">{user?.name}</p>
                                    </div>
                                </div>
                            )}

                            <nav className="flex flex-col gap-6 flex-1">
                                {currentLinks.map(({ label, href }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`text-lg font-bold ${isActive(href) ? 'text-[#5FA8FF]' : 'text-[#64748B]'}`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="pt-8 border-t border-slate-100 flex flex-col gap-4">
                                {isAuthenticated ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-4 rounded-2xl bg-red-50 text-[#F87171] font-bold flex items-center justify-center gap-2"
                                    >
                                        <FiLogOut /> Logout
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            href="/signin"
                                            className="w-full py-4 text-center font-bold text-[#64748B]"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="w-full py-4 text-center font-bold text-white bg-[#5FA8FF] rounded-2xl shadow-lg shadow-[#5FA8FF]/20"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            
            {/* Spacer to push content below fixed header */}
            <div className="h-20" />
        </>
    );
}