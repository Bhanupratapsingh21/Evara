'use client';
import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthHeader() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full absolute top-0 left-0 p-8 md:p-12 z-50 flex justify-start"
        >
            <Link href="/" className="flex items-center gap-2.5 group">
                {/* Logo Squircle */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] flex items-center justify-center text-white shadow-sm transition-transform duration-500 group-hover:rotate-6">
                    <GraduationCap size={22} strokeWidth={2.5} />
                </div>

                {/* Brand Name */}
                <span className="text-2xl font-black tracking-tighter text-[#0F172A]">
                    EVARA
                </span>
            </Link>
        </motion.header>
    );
}