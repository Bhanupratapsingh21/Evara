'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
    Eye, Gamepad2, University, MessageSquare, Film,
    Heart, Bookmark, History, LogOut, User, Zap,
    ChevronRight, Radio, GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/hooks';
import { logoutUser } from '@/lib/logout';
import { logout } from '@/store/slices/userSlice';
import { cn } from '@/lib/utils';
import { FiX } from 'react-icons/fi';

const Sidebar = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { position, waiting, online } = useAppSelector(s => s.socket);
    const user = useSelector((state: any) => state.user.user);
    const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

    const currentTab = pathname.split('/')[3] || 'reels';

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logout());
        router.push('/');
    };

    const mainTabs = [
        { id: 'minigames', icon: Gamepad2, label: 'Arcade' },
        { id: 'unispace', icon: University, label: 'Campus' },
        { id: 'assumer', icon: MessageSquare, label: 'Chats' }
    ];

    const getSubTabs = () => {
        switch (currentTab) {
            case 'minigames':
                return [{ id: 'saved-games', icon: Bookmark, label: 'Saved' }];
            case 'unispace':
                return [
                    { id: 'overview', icon: Eye, label: 'Overview' },
                    { id: 'universities', icon: University, label: 'Discovery' }
                ];
            case 'assumer':
                return [
                    { id: 'chat-history', icon: History, label: 'History' },
                    { id: 'active', icon: Radio, label: 'Live Now' },
                ];
            default: return [];
        }
    };

    return (
        <div className="flex h-screen bg-[#F9FAFC] overflow-hidden">

            {/* --- DESKTOP SIDEBAR --- */}
            <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-100 relative z-20">
                {/* Logo Area */}
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] flex items-center justify-center text-white shadow-sm transition-transform group-hover:rotate-3">
                            <GraduationCap size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[#0F172A]">EVARA</span>
                    </Link>
                </div>

                {/* Live Status Pill */}
                <div className="px-6 mb-6">
                    <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Status</span>
                            <div className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]"></span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-[#0F172A]">{online || 0}</span>
                                <span className="text-[10px] text-slate-500 font-medium">Online</span>
                            </div>
                            <div className="flex flex-col border-l border-slate-200 pl-3">
                                <span className="text-lg font-bold text-[#5FA8FF]">{position || 0}</span>
                                <span className="text-[10px] text-slate-500 font-medium">In Queue</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Scroll Area */}
                <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
                    <div className="space-y-1">
                        {mainTabs.map((tab) => {
                            const active = currentTab === tab.id;
                            return (
                                <Link
                                    key={tab.id}
                                    href={`/waitingRoom/tabs/${tab.id}`}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group",
                                        active ? "bg-[#5FA8FF]/10 text-[#5FA8FF]" : "text-slate-500 hover:bg-slate-50"
                                    )}
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                        active ? "bg-[#5FA8FF] text-white shadow-lg shadow-blue-200" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                                    )}>
                                        <tab.icon size={20} />
                                    </div>
                                    <span className="font-bold text-sm">{tab.label}</span>
                                    {active && <ChevronRight size={16} className="ml-auto" />}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-50">
                        <span className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
                            Sub Menu
                        </span>
                        <div className="space-y-1">
                            {getSubTabs().map((tab) => (
                                <Link
                                    key={tab.id}
                                    href="/ComingSoon"
                                    className="flex items-center gap-4 p-3 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all group"
                                >
                                    <tab.icon size={18} className="group-hover:text-[#B9A8FF]" />
                                    <span className="text-sm font-medium">{tab.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* User Footer */}
                <div className="p-4 mt-auto">
                    <div className="bg-[#0F172A] rounded-[2rem] p-4 flex items-center gap-3 shadow-xl">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5FA8FF] to-[#B9A8FF] p-0.5">
                            <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center text-white font-bold text-xs uppercase">
                                {user?.name?.[0] || 'U'}
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-white text-xs font-bold truncate">{user?.name || 'Student'}</p>
                            <button onClick={handleLogout} className="text-[10px] text-slate-400 hover:text-red-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                                <LogOut size={10} /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

                {/* Mobile Top Header */}
                <header className="md:hidden h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#5FA8FF] flex items-center justify-center text-white">
                            <GraduationCap size={16} />
                        </div>
                        <span className="font-bold text-[#0F172A]">EVARA</span>
                    </Link>
                    <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600">
                        <Radio size={24} className="animate-pulse text-[#5FA8FF]" />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                    {children}
                </div>
            </main>

            {/* --- MOBILE OVERLAY MENU (Framer Motion) --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[80%] bg-white z-[110] md:hidden flex flex-col p-6"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <span className="font-bold text-xl">Menu</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><FiX size={24} /></button>
                            </div>

                            <div className="space-y-4">
                                {mainTabs.map((tab) => (
                                    <Link
                                        key={tab.id}
                                        href={`/waitingRoom/tabs/${tab.id}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-4 p-4 rounded-2xl font-bold transition-all",
                                            currentTab === tab.id ? "bg-[#5FA8FF] text-white" : "text-slate-600 bg-slate-50"
                                        )}
                                    >
                                        <tab.icon size={20} />
                                        {tab.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto border-t pt-6 flex flex-col gap-4">
                                <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-4 bg-red-50 text-red-500 font-bold rounded-2xl">
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Sidebar;